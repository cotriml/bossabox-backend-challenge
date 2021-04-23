import { AddToolController } from '@/presentation/controllers'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { serverError, badRequest, created } from '@/presentation/helpers'
import { ValidationSpy, AddToolSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

const mockRequest = (): AddToolController.Request => {
  return {
    title: faker.lorem.word(),
    link: faker.internet.url(),
    description: faker.lorem.sentence(),
    tags: [
      faker.random.word(),
      faker.random.word()
    ]
  }
}

type SutTypes = {
  sut: AddToolController
  addToolSpy: AddToolSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addToolSpy = new AddToolSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddToolController(addToolSpy, validationSpy)
  return {
    sut,
    addToolSpy,
    validationSpy
  }
}

describe('AddTool Controller', () => {
  test('should call AddTool with correct values', async () => {
    const { sut, addToolSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addToolSpy.addToolParams).toEqual({
      title: request.title,
      link: request.link,
      description: request.description,
      tags: request.tags
    })
  })

  test('should return 201 if AddTool returns a tool', async () => {
    const { sut, addToolSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(created(addToolSpy.result))
  })

  test('should return 500 if AddTool throws', async () => {
    const { sut, addToolSpy } = makeSut()
    jest.spyOn(addToolSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 400 if Validation returns and error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
