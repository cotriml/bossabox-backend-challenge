import env from '@/main/config/env'
import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: {
    data: data
  }
})

export const paginated = (data: any, metadata?: any): HttpResponse => ({
  statusCode: 200,
  body: {
    data: data,
    metadata: {
      pageSize: metadata?.pageSize || env.defaultPageSizePagination,
      currentPage: metadata?.currentPage || env.defaultCurrentPagePagination,
      maxPageSize: env.maxPageSizePagination
    }
  }
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: {
    data: data
  }
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: {}
})
