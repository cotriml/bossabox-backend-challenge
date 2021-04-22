import { MongoHelper } from '@/infra/db'
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
    const query = tag ? { tags: tag } : {}
    const tools = await toolCollection.find(query)
      .skip((pageSize || defaultPageSize) * ((currentPage || defaultCurrentPage) - 1))
      .limit(pageSize || defaultPageSize)
      .toArray()
    return MongoHelper.mapCollection(tools)
  }
}
