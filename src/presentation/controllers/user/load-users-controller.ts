import { paginated, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadUsers } from '@/domain/usecases'

export class LoadUsersController implements Controller {
  constructor (private readonly loadUsers: LoadUsers) { }

  async handle (request?: LoadUsersController.Request): Promise<HttpResponse> {
    try {
      const { pageSize, currentPage } = request || {}
      const pagination = {
        pageSize: +pageSize,
        currentPage: +currentPage
      }
      const users = await this.loadUsers.load(pagination)
      return paginated(users, pagination)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadUsersController {
  export type Request = {
    pageSize?: number
    currentPage?: number
  }
}
