import { PaginationModel, ToolModel } from '@/domain/models'

export interface LoadToolsRepository {
  loadAll: (tag?: string, pagination?: PaginationModel) => Promise<LoadToolsRepository.Result>
}

export namespace LoadToolsRepository {
  export type Result = ToolModel[]
}
