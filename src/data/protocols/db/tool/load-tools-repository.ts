import { ToolModel } from '@/domain/models'

export interface LoadToolsRepository {
  loadAll: (tag?: string) => Promise<LoadToolsRepository.Result>
}

export namespace LoadToolsRepository {
  export type Result = ToolModel[]
}
