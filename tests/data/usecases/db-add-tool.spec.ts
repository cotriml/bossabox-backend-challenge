import { DbAddTool } from '@/data/usecases'
import { mockAddToolParams, throwError } from '@/tests/domain/mocks'
import { AddToolRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddTool
  addToolRepositorySpy: AddToolRepositorySpy
}

const makeSut = (): SutTypes => {
  const addToolRepositorySpy = new AddToolRepositorySpy()
  const sut = new DbAddTool(addToolRepositorySpy)
  return {
    sut,
    addToolRepositorySpy
  }
}

describe('DbAddTools Usecase', () => {
  test('Should call AddToolsRepository with correct values', async () => {
    const { sut, addToolRepositorySpy } = makeSut()
    const addToolParams = mockAddToolParams()
    await sut.add(addToolParams)
    expect(addToolRepositorySpy.addToolParams).toEqual({
      title: addToolParams.title,
      link: addToolParams.link,
      description: addToolParams.description,
      tags: addToolParams.tags
    })
  })

  test('Should throw if AddToolRepository throws', async () => {
    const { sut, addToolRepositorySpy } = makeSut()
    jest.spyOn(addToolRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddToolParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return the added tool on success', async () => {
    const { sut, addToolRepositorySpy } = makeSut()
    const tool = await sut.add(mockAddToolParams())
    expect(tool).toBeTruthy()
    expect(tool).toEqual(addToolRepositorySpy.result)
  })
})
