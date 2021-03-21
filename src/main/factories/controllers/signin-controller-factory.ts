import { makeDbAuthentication, makeSigninValidation, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { SigninController } from '@/presentation/controllers'

export const makeLoginController = (): Controller => {
  const controller = new SigninController(makeDbAuthentication(), makeSigninValidation())
  return makeLogControllerDecorator(controller)
}
