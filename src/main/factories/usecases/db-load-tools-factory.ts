import { LoadTools } from '@/domain/usecases'
import { DbLoadTools } from '@/data/usecases'
import { ToolMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadTools = (): LoadTools => {
  const toolMongoRepository = new ToolMongoRepository()
  return new DbLoadTools(toolMongoRepository)
}
