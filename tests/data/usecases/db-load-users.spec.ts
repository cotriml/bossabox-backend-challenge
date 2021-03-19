import { DbLoadUsers } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { LoadUsersRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadUsers
  loadUsersRepositorySpy: LoadUsersRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadUsersRepositorySpy = new LoadUsersRepositorySpy()
  const sut = new DbLoadUsers(loadUsersRepositorySpy)
  return {
    sut,
    loadUsersRepositorySpy
  }
}

describe('DbLoadUsers', () => {
  test('Should call LoadUsersRepository', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    const userId = faker.random.uuid()
    await sut.load(userId)
    expect(loadUsersRepositorySpy.userId).toBe(userId)
  })

  test('Should return a list of Users on success', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    const users = await sut.load(faker.random.uuid())
    expect(users).toEqual(loadUsersRepositorySpy.result)
  })

  test('Should throw if DbLoadUsersRepository throws', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    jest.spyOn(loadUsersRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
