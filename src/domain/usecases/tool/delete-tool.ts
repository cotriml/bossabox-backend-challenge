export interface DeleteTool {
  delete: (toolId: string) => Promise<DeleteTool.Result>
}

export namespace DeleteTool {
  export type Result = boolean
}
