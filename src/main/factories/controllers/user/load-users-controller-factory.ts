import { makeLogControllerDecorator, makeDbLoadUsers } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadUsersController } from '@/presentation/controllers'

export const makeLoadUsersController = (): Controller => {
  const controller = new LoadUsersController(makeDbLoadUsers())
  return makeLogControllerDecorator(controller)
}
