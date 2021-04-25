import { AddToolRepository, DeleteToolRepository, LoadToolsRepository } from '@/data/protocols'
import { PaginationModel, ToolModel } from '@/domain/models'
import { mockToolsModels } from '@/tests/domain/mocks'
import faker from 'faker'

export class AddToolRepositorySpy implements AddToolRepository {
  result = {
    id: faker.random.uuid(),
    title: faker.lorem.word(),
    link: faker.internet.url(),
    description: faker.lorem.sentence(),
    tags: [
      faker.random.word(),
      faker.random.word()
    ]
  }

  addToolParams: AddToolRepository.Params

  async add (data: AddToolRepository.Params): Promise<AddToolRepository.Result> {
    this.addToolParams = data
    return this.result
  }
}

export class LoadToolsRepositorySpy implements LoadToolsRepository {
  result = { data: mockToolsModels() }
  count: number = 0
  tag: string
  pagination: PaginationModel

  async loadAll (tag?: string, pagination?: PaginationModel): Promise<LoadToolsRepository.Result> {
    this.count++
    this.tag = tag
    this.pagination = pagination

    return this.result
  }
}

export class DeleteToolRepositorySpy implements DeleteToolRepository {
  result = true
  toolId: string

  async delete (toolId: string): Promise<DeleteToolRepository.Result> {
    this.toolId = toolId
    return this.result
  }
}
