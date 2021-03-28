import { makeDbDeleteTool, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { DeleteToolController } from '@/presentation/controllers'

export const makeDeleteToolController = (): Controller => {
  const controller = new DeleteToolController(makeDbDeleteTool())
  return makeLogControllerDecorator(controller)
}
