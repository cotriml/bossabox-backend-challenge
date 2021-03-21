import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'
import request from 'supertest'

let userCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('POST /users', () => {
    test('Should return 200 on addUser', async () => {
      await request(app)
        .post('/api/users')
        .send({
          name: 'Lucas',
          role: 'admin',
          email: 'lucascotrim3@hotmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(201)
    })
  })
})
