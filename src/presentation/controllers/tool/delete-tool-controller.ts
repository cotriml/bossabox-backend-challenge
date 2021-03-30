import { Controller, HttpResponse } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { DeleteTool } from '@/domain/usecases'

export class DeleteToolController implements Controller {
  constructor (
    private readonly deleteTool: DeleteTool
  ) { }

  async handle (request: DeleteToolController.Request): Promise<HttpResponse> {
    try {
      const { toolId } = request
      const result = await this.deleteTool.delete(toolId)
      if (!result) {
        return badRequest(new InvalidParamError('toolId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteToolController {
  export type Request = {
    toolId: string
  }
}
