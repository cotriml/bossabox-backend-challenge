import { LoadToolsController } from '@/presentation/controllers'
import { badRequest, paginated, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadToolsSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { GeneralError } from '@/presentation/errors'
import faker from 'faker'

const mockRequest = (): LoadToolsController.Request => ({
  tag: faker.random.word()
})

type SutTypes = {
  sut: LoadToolsController
  loadToolsSpy: LoadToolsSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const loadToolsSpy = new LoadToolsSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoadToolsController(loadToolsSpy, validationSpy)
  return {
    sut,
    loadToolsSpy,
    validationSpy
  }
}

describe('LoadTools Controller', () => {
  test('Should call LoadTools', async () => {
    const { sut, loadToolsSpy } = makeSut()
    await sut.handle()
    expect(loadToolsSpy.count).toBe(1)
  })

  test('Should call LoadTools with correct tag', async () => {
    const { sut, loadToolsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadToolsSpy.count).toBe(1)
    expect(loadToolsSpy.tag).toBe(request.tag)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadToolsSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(paginated(loadToolsSpy.result))
  })

  test('Should reuturn 500 if LoadTools throws', async () => {
    const { sut, loadToolsSpy } = makeSut()
    jest.spyOn(loadToolsSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = { pageSize: 1, currentPage: 1 }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 400 if Validation returns and error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new GeneralError(faker.random.word())
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
