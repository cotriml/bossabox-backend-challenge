import { DeleteTool } from '@/domain/usecases'
import { DbDeleteTool } from '@/data/usecases'
import { ToolMongoRepository } from '@/infra/db'

export const makeDbDeleteTool = (): DeleteTool => {
  const toolMongoRepository = new ToolMongoRepository()
  return new DbDeleteTool(toolMongoRepository)
}
