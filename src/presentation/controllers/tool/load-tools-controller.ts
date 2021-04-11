import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadTools } from '@/domain/usecases'

export class LoadToolsController implements Controller {
  constructor (private readonly loadTools: LoadTools) { }

  async handle (request?: LoadToolsController.Request): Promise<HttpResponse> {
    try {
      const { pageSize, currentPage, tag } = request || {}
      const pagination = {
        pageSize: +pageSize,
        currentPage: +currentPage
      }
      const tools = await this.loadTools.load(tag, pagination)
      return tools.length ? ok(tools) : noContent()
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
