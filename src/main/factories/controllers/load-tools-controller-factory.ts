import { makeDbLoadTools, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadToolsController } from '@/presentation/controllers'

export const makeLoadToolsController = (): Controller => {
  const controller = new LoadToolsController(makeDbLoadTools())
  return makeLogControllerDecorator(controller)
}
