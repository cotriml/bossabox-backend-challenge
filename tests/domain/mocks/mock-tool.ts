import { AddTool } from '@/domain/usecases'
import faker from 'faker'
import { ToolModel } from '../models'

export const mockAddToolParams = (): AddTool.Params => ({
  title: faker.name.firstName(),
  link: faker.internet.url(),
  description: faker.lorem.sentence(),
  tags: [
    faker.random.word(),
    faker.random.word()
  ]
})

export const mockToolModel = (): ToolModel => {
  return {
    id: faker.random.uuid(),
    title: faker.name.firstName(),
    link: faker.internet.url(),
    description: faker.lorem.sentence(),
    tags: [
      faker.random.word(),
      faker.random.word()
    ]
  }
}

export const mockToolsModels = (): ToolModel[] => [
  mockToolModel(),
  mockToolModel()
]
