import { makeDbLoadTools, makeLogControllerDecorator, makeLoadToolsValidation } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadToolsController } from '@/presentation/controllers'

export const makeLoadToolsController = (): Controller => {
  const controller = new LoadToolsController(makeDbLoadTools(), makeLoadToolsValidation())
  return makeLogControllerDecorator(controller)
}
