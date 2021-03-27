import { DbDeleteTool } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { DeleteToolRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbDeleteTool
  deleteToolRepositorySpy: DeleteToolRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteToolRepositorySpy = new DeleteToolRepositorySpy()
  const sut = new DbDeleteTool(deleteToolRepositorySpy)
  return {
    sut,
    deleteToolRepositorySpy
  }
}

describe('DbDeleteTool Usecase', () => {
  test('Should call DeleteToolRepository with correct values', async () => {
    const { sut, deleteToolRepositorySpy } = makeSut()
    const toolId = faker.random.uuid()
    await sut.delete(toolId)
    expect(deleteToolRepositorySpy.toolId).toBe(toolId)
  })

  test('Should throw if DeleteUserRepository throws', async () => {
    const { sut, deleteToolRepositorySpy } = makeSut()
    jest.spyOn(deleteToolRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if DeleteToolRepository returns false', async () => {
    const { sut, deleteToolRepositorySpy } = makeSut()
    deleteToolRepositorySpy.result = false
    const isDeleted = await sut.delete(faker.random.uuid())
    expect(isDeleted).toBe(false)
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isDeleted = await sut.delete(faker.random.uuid())
    expect(isDeleted).toBe(true)
  })
})
