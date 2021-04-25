import { MongoHelper, QueryBuilder } from '@/infra/db'
import {
  AddToolRepository,
  LoadToolsRepository,
  DeleteToolRepository
} from '@/data/protocols/db'
import { PaginationModel } from '@/domain/models'
import env from '@/main/config/env'
import { ObjectId } from 'mongodb'

const toolsColletionName = 'tools'
const defaultPageSize = +env.defaultPageSizePagination
const defaultCurrentPage = +env.defaultCurrentPagePagination

export class ToolMongoRepository implements AddToolRepository, LoadToolsRepository, DeleteToolRepository {
  async add (data: AddToolRepository.Params): Promise<AddToolRepository.Result> {
    const toolCollection = await MongoHelper.getCollection(toolsColletionName)
    const result = await toolCollection.insertOne(data)
    return MongoHelper.map(result.ops[0])
  }

  async delete (toolId: string): Promise<DeleteToolRepository.Result> {
    const toolCollection = await MongoHelper.getCollection(toolsColletionName)
    const result = await toolCollection.deleteOne({ _id: new ObjectId(toolId) })
    return result.deletedCount === 1
  }

  async loadAll (tag?: string, pagination?: PaginationModel): Promise<LoadToolsRepository.Result> {
    const toolCollection = await MongoHelper.getCollection(toolsColletionName)
    const { pageSize, currentPage } = pagination || {}
    const filter = tag ? { tags: tag } : {}

    const totalRecords = await toolCollection.countDocuments(filter)
    const query = new QueryBuilder()
      .match(filter)
      .skip((pageSize || defaultPageSize) * ((currentPage || defaultCurrentPage) - 1))
      .limit(pageSize || defaultPageSize)
      .group({
        _id: 0,
        data: {
          $push: '$$ROOT'
        },
        total: {
          $sum: 1
        }
      })
      .addFields({
        metadata: {
          totalRecords: totalRecords,
          totalFiltered: '$total',
          pageSize: pageSize || defaultPageSize,
          currentPage: currentPage || defaultCurrentPage
        }
      })
      .project({
        _id: 0,
        data: 1,
        metadata: 1
      })
      .build()
    let tools = await toolCollection.aggregate(query).toArray()
    if (tools.length === 0) {
      tools = [{
        data: [],
        metadata: {
          totalRecords: totalRecords,
          totalFiltered: 0,
          pageSize: pageSize || defaultPageSize,
          currentPage: currentPage || defaultCurrentPage
        }
      }]
    }
    tools[0].data = MongoHelper.mapCollection(tools[0].data)
    return tools[0]
  }
}
