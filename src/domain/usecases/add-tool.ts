import { ToolModel } from '@/domain/models'

export interface AddTool {
  add: (tool: AddTool.Params) => Promise<AddTool.Result>
}

export namespace AddTool {
  export type Params = {
    title: string
    link: string
    description: string
    tags: string[]
  }

  export type Result = ToolModel
}
