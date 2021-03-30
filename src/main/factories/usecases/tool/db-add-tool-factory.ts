import { AddTool } from '@/domain/usecases'
import { DbAddTool } from '@/data/usecases'
import { ToolMongoRepository } from '@/infra/db'

export const makeDbAddTool = (): AddTool => {
  const toolMongoRepository = new ToolMongoRepository()
  return new DbAddTool(toolMongoRepository)
}
