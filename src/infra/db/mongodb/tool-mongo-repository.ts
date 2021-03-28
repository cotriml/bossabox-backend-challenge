import { MongoHelper } from '@/infra/db'
import {
  AddToolRepository,
  LoadToolsRepository,
  DeleteToolRepository
} from '@/data/protocols/db'
import { ObjectId } from 'bson'

const toolsColletionName = 'tools'

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

  async loadAll (tag?: string): Promise<LoadToolsRepository.Result> {
    const toolCollection = await MongoHelper.getCollection(toolsColletionName)
    const query = tag ? { tags: tag } : {}
    const tools = await toolCollection.find(query).toArray()
    return MongoHelper.mapCollection(tools)
  }
}
