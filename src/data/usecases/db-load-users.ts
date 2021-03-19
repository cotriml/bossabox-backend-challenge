import { LoadUsersRepository } from '@/data/protocols'
import { LoadUsers } from '@/domain/usecases'

export class DbLoadUsers implements LoadUsers {
  constructor (private readonly loadUsersRepository: LoadUsersRepository) { }

  async load (userId: string): Promise<LoadUsers.Result> {
    const users = await this.loadUsersRepository.loadAll(userId)
    return users
  }
}
