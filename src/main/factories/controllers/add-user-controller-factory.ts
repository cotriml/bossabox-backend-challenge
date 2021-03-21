import { makeDbAddUser, makeAddUserValidation, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { AddUserController } from '@/presentation/controllers'

export const makeUserController = (): Controller => {
  const controller = new AddUserController(makeDbAddUser(), makeAddUserValidation())
  return makeLogControllerDecorator(controller)
}
