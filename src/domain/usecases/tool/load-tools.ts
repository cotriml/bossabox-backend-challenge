import { PaginationModel, ToolModel } from '@/domain/models'

export interface LoadTools {
  load: (tag?: string, pagination?: PaginationModel) => Promise<LoadTools.Result>
}

export namespace LoadTools {
  export type Result = ToolModel[]
}
