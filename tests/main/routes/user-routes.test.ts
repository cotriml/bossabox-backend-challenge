import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'
import request from 'supertest'
import { hash } from 'bcrypt'

let userCollection: Collection

describe('Users Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
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

  describe('POST /users/signin', () => {
    test('Should return 200 on Signin', async () => {
      const password = await hash('123', 12)
      await userCollection.insertOne({
        name: 'Lucas Cotrim',
        role: 'admin',
        email: 'lucascotrim3@hotmail.com',
        password: password
      })

      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'lucascotrim3@hotmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on Signin', async () => {
      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'lucascotrim3@hotmail.com',
          password: '123'
        })
        .expect(401)
    })
  })

  describe('GET /users', () => {
    test('Should return 200 on LoadUsers', async () => {
      await request(app)
        .get('/api/users')
        .expect(204)
    })
  })
})
