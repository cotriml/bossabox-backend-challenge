import { AddToolRepository, DeleteToolRepository, LoadToolsRepository } from '@/data/protocols'
import { ToolModel } from '@/domain/models'
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
  result = mockToolsModels()
  count: number = 0
  tag: string

  async loadAll (tag?: string): Promise<ToolModel[]> {
    this.count++
    this.tag = tag
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
