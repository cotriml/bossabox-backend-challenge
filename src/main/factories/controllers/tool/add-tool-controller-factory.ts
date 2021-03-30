import { makeDbAddTool, makeAddToolValidation, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { AddToolController } from '@/presentation/controllers'

export const makeAddToolController = (): Controller => {
  const controller = new AddToolController(makeDbAddTool(), makeAddToolValidation())
  return makeLogControllerDecorator(controller)
}
