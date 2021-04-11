import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import ObjectID from 'bson-objectid'

let toolCollection: Collection
let userCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await userCollection.insertOne({
    name: 'Lucas Cotrim',
    role: 'admin',
    email: 'lucascotrim@hotmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)

  await userCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Tools Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    toolCollection = await MongoHelper.getCollection('tools')
    await toolCollection.deleteMany({})

    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('POST /tools', () => {
    test('Should return 201 on addTool with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/tools')
        .set('x-access-token', accessToken)
        .send({
          title: 'XCode',
          link: 'any_link',
          description: 'IDE for Apple Applications',
          tags: [
            'iOS',
            'macOS'
          ]
        })
        .expect(201)
    })

    test('Should return 403 on addTool with no accessToken', async () => {
      await request(app)
        .post('/api/tools')
        .send({
          title: 'XCode',
          link: 'any_link',
          description: 'IDE for Apple Applications',
          tags: [
            'iOS',
            'macOS'
          ]
        })
        .expect(403)
    })
  })

  describe('GET /tools', () => {
    test('Should return 200 on LoadTools success with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/tools')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 200 on LoadTools success with tag parameter and valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/tools?tag=any_tag')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on LoadTools success with no accessToken', async () => {
      await request(app)
        .get('/api/tools')
        .expect(403)
    })
  })

  describe('DELETE /tools/:toolId', () => {
    test('Should return 204 on DeleteTool success with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const tool = await toolCollection.insertOne({
        title: 'XCode',
        link: 'any_link',
        description: 'IDE for Apple Applications',
        tags: [
          'iOS',
          'macOS'
        ]
      })
      await request(app)
        .delete(`/api/tools/${tool.ops[0]._id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 403 on DeleteTool success with no accessToken', async () => {
      const tool = await toolCollection.insertOne({
        title: 'XCode',
        link: 'any_link',
        description: 'IDE for Apple Applications',
        tags: [
          'iOS',
          'macOS'
        ]
      })
      await request(app)
        .delete(`/api/tools/${tool.ops[0]._id}`)
        .expect(403)
    })

    test('Should return 400 on DeleteTool failure', async () => {
      const accessToken = await makeAccessToken()
      const objectId = new ObjectID()
      await request(app)
        .delete(`/api/tools/${objectId.toHexString()}`)
        .set('x-access-token', accessToken)
        .expect(400)
    })
  })
})
