import { LoadUsersRepository } from '@/data/protocols'
import { LoadUsers } from '@/domain/usecases'

export class DbLoadUsers implements LoadUsers {
  constructor (private readonly loadUsersRepository: LoadUsersRepository) { }

  async load (): Promise<LoadUsers.Result> {
    const users = await this.loadUsersRepository.loadAll()
    return users
  }
}
