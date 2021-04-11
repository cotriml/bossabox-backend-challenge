import { LoadToolsController } from '@/presentation/controllers'
import { paginated, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadToolsSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): LoadToolsController.Request => ({
  tag: faker.random.word()
})

type SutTypes = {
  sut: LoadToolsController
  loadToolsSpy: LoadToolsSpy
}

const makeSut = (): SutTypes => {
  const loadToolsSpy = new LoadToolsSpy()
  const sut = new LoadToolsController(loadToolsSpy)
  return {
    sut,
    loadToolsSpy
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

  test('Should return 204 if LoadTools return empty', async () => {
    const { sut, loadToolsSpy } = makeSut()
    loadToolsSpy.result = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(paginated(loadToolsSpy.result))
  })

  test('Should reuturn 500 if LoadTools throws', async () => {
    const { sut, loadToolsSpy } = makeSut()
    jest.spyOn(loadToolsSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
