import { DbLoadTools } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { LoadToolsRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadTools
  loadToolsRepositorySpy: LoadToolsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadToolsRepositorySpy = new LoadToolsRepositorySpy()
  const sut = new DbLoadTools(loadToolsRepositorySpy)
  return {
    sut,
    loadToolsRepositorySpy
  }
}

describe('DbLoadTools', () => {
  test('Should call LoadToolsRepository', async () => {
    const { sut, loadToolsRepositorySpy } = makeSut()
    await sut.load()
    expect(loadToolsRepositorySpy.count).toBe(1)
  })

  test('Should call LoadToolsRepository with correct tag parameter', async () => {
    const { sut, loadToolsRepositorySpy } = makeSut()
    const tag = faker.random.word()
    await sut.load(tag)
    expect(loadToolsRepositorySpy.count).toBe(1)
    expect(loadToolsRepositorySpy.tag).toBe(tag)
  })

  test('Should return a list of Tools on success', async () => {
    const { sut, loadToolsRepositorySpy } = makeSut()
    const tools = await sut.load()
    expect(tools).toEqual(loadToolsRepositorySpy.result)
  })

  test('Should throw if DbLoadToolsRepository throws', async () => {
    const { sut, loadToolsRepositorySpy } = makeSut()
    jest.spyOn(loadToolsRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
