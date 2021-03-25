export interface DeleteToolRepository {
  delete: (toolId: string) => Promise<DeleteToolRepository.Result>
}

export namespace DeleteToolRepository {
  export type Result = boolean
}
