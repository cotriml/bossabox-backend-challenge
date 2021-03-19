import { UserModel } from '@/domain/models'

export interface LoadUsers {
  load: (userId: string) => Promise<LoadUsers.Result>
}

export namespace LoadUsers {
  export type Result = UserModel[]
}
