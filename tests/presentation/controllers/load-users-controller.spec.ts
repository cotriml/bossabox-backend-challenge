import { LoadUsersController } from '@/presentation/controllers'
import { paginated, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadUsersSpy } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: LoadUsersController
  loadUsersSpy: LoadUsersSpy
}

const makeSut = (): SutTypes => {
  const loadUsersSpy = new LoadUsersSpy()
  const sut = new LoadUsersController(loadUsersSpy)
  return {
    sut,
    loadUsersSpy
  }
}

describe('LoadUsers Controller', () => {
  test('Should call LoadUsers', async () => {
    const { sut, loadUsersSpy } = makeSut()
    await sut.handle()
    expect(loadUsersSpy.count).toBe(1)
  })

  test('Should return 200 on success ', async () => {
    const { sut, loadUsersSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(paginated(loadUsersSpy.result))
  })

  test('Should reuturn 500 if LoadUsers throws', async () => {
    const { sut, loadUsersSpy } = makeSut()
    jest.spyOn(loadUsersSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
