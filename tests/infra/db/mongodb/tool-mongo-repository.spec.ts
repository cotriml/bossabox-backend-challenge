import env from '@/main/config/env'
import { MongoHelper, ToolMongoRepository } from '@/infra/db'
import { mockAddToolParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'
import ObjectId from 'bson-objectid'

let toolCollection: Collection

describe('ToolMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    toolCollection = await MongoHelper.getCollection('tools')
    await toolCollection.deleteMany({})
  })

  const makeSut = (): ToolMongoRepository => {
    return new ToolMongoRepository()
  }

  describe('add()', () => {
    test('Should return an Tool on success', async () => {
      const sut = makeSut()
      const addToolParams = mockAddToolParams()
      const tool = await sut.add(addToolParams)
      expect(tool.id).toBeTruthy()
      expect(tool.title).toBe(addToolParams.title)
      expect(tool.link).toBe(addToolParams.link)
      expect(tool.description).toBe(addToolParams.description)
      expect(tool.tags).toBe(addToolParams.tags)
    })
  })

  describe('loadAll()', () => {
    test('Should return a list of Tools on success', async () => {
      const sut = makeSut()
      const addToolParams = mockAddToolParams()
      await toolCollection.insertOne(addToolParams)
      const tools = await sut.loadAll()
      expect(tools).toBeTruthy()
      expect(tools[0].id).toBeTruthy()
      expect(tools[0].title).toBe(addToolParams.title)
      expect(tools[0].link).toBe(addToolParams.link)
      expect(tools[0].description).toBe(addToolParams.description)
      expect(tools[0].tags).toEqual(addToolParams.tags)
    })

    test('Should return a list of Tools with tag parameter on success', async () => {
      const sut = makeSut()
      const addToolParams = mockAddToolParams()
      await toolCollection.insertOne(addToolParams)
      const tools = await sut.loadAll(addToolParams.tags[0])
      expect(tools).toBeTruthy()
      expect(tools[0].id).toBeTruthy()
      expect(tools[0].tags).toContain(addToolParams.tags[0])
    })

    test('Should return empty array', async () => {
      const sut = makeSut()
      const tools = await sut.loadAll()
      expect(tools).toEqual([])
    })
  })

  describe('delete()', () => {
    test('Should return true on deletion success', async () => {
      const sut = makeSut()
      const addToolParams = mockAddToolParams()
      const userInserted = await toolCollection.insertOne(addToolParams)
      const result = await sut.delete(userInserted.insertedId)
      expect(result).toBe(true)
    })

    test('Should return false if Tool not found', async () => {
      const sut = makeSut()
      const fakeObjectId = new ObjectId()
      const result = await sut.delete(fakeObjectId.id)
      expect(result).toBe(false)
    })
  })
})
