import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { AddTool } from '@/domain/usecases'

export class AddToolController implements Controller {
  constructor (
    private readonly addTool: AddTool,
    private readonly validation: Validation
  ) { }

  async handle (request: AddToolController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { title, link, description, tags } = request
      const tool = await this.addTool.add({
        title,
        link,
        description,
        tags
      })

      return created(tool)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddToolController {
  export type Request = {
    title: string
    link: string
    description: string
    tags: string[]
  }
}
