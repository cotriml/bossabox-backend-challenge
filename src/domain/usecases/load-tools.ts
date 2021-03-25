import { ToolModel } from '@/domain/models'

export interface LoadTools {
  load: (tag?: string) => Promise<LoadTools.Result>
}

export namespace LoadTools {
  export type Result = ToolModel[]
}
