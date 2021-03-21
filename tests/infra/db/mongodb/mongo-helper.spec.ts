import { MongoHelper as sut } from '@/infra/db'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let userCollection = await sut.getCollection('user')
    expect(userCollection).toBeTruthy()
    await sut.disconnect()
    userCollection = await sut.getCollection('user')
    expect(userCollection).toBeTruthy()
  })
})
