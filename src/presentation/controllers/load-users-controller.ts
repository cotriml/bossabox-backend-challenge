import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadUsers } from '@/domain/usecases'

export class LoadUsersController implements Controller {
  constructor (private readonly loadUsers: LoadUsers) { }

  async handle (): Promise<HttpResponse> {
    try {
      const users = await this.loadUsers.load()
      return users.length ? ok(users) : noContent(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
