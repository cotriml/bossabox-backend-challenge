import { DeleteToolController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { DeleteToolSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

const mockRequest = (): DeleteToolController.Request => ({
  toolId: faker.random.uuid()
})

type SutTypes = {
  sut: DeleteToolController
  deleteToolSpy: DeleteToolSpy
}

const makeSut = (): SutTypes => {
  const deleteToolSpy = new DeleteToolSpy()
  const sut = new DeleteToolController(deleteToolSpy)
  return {
    sut,
    deleteToolSpy
  }
}

describe('DeleteToolController', () => {
  test('Should call DeleteTool with correct values', async () => {
    const { sut, deleteToolSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteToolSpy.toolId).toBe(request.toolId)
  })

  test('Should return 500 if DeleteTool throws', async () => {
    const { sut, deleteToolSpy } = makeSut()
    jest.spyOn(deleteToolSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 on delete fail', async () => {
    const { sut, deleteToolSpy } = makeSut()
    deleteToolSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('toolId')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
