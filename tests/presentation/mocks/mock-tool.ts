import { AddTool, DeleteTool, LoadTools } from '@/domain/usecases'
import { mockToolsModels } from '@/tests/domain/mocks'
import faker from 'faker'

export class AddToolSpy implements AddTool {
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

  addToolParams: AddTool.Params
  async add (tool: AddTool.Params): Promise<AddTool.Result> {
    this.addToolParams = tool
    return this.result
  }
}

export class LoadToolsSpy implements LoadTools {
  result = mockToolsModels()
  count: number = 0
  tag: string
  async load (tag?: string): Promise<LoadTools.Result> {
    this.count++
    this.tag = tag
    return this.result
  }
}

export class DeleteToolSpy implements DeleteTool {
  result = true
  toolId: string
  async delete (toolId: string): Promise<DeleteTool.Result> {
    this.toolId = toolId
    return this.result
  }
}
