import { serverError, badRequest, ok } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadTools } from '@/domain/usecases'

export class LoadToolsController implements Controller {
  constructor (
    private readonly loadTools: LoadTools,
    private readonly validation: Validation
  ) { }

  async handle (request?: LoadToolsController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { pageSize, currentPage, tag } = request || {}
      const pagination = {
        pageSize: +pageSize,
        currentPage: +currentPage
      }
      const tools = await this.loadTools.load(tag, pagination)
      return ok(tools)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadToolsController {
  export type Request = {
    tag?: string
    pageSize?: number
    currentPage?: number
  }
}
