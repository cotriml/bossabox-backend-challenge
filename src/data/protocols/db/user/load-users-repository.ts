import { UserModel } from '@/domain/models'

export interface LoadUsersRepository {
  loadAll: (userId: string) => Promise<LoadUsersRepository.Result>
}

export namespace LoadUsersRepository {
  export type Result = UserModel[]
}
