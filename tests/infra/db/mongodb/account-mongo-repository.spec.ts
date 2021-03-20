import { MongoHelper, UserMongoRepository } from '@/infra/db'
import { mockAddUserParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'
import faker from 'faker'
import ObjectId from 'bson-objectid'

let userCollection: Collection

describe('UserMongoRepository', () => {
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

  const makeSut = (): UserMongoRepository => {
    return new UserMongoRepository()
  }

  describe('add()', () => {
    test('Should return an User on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      const isValid = await sut.add(addUserParams)
      expect(isValid).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an User on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const user = await sut.loadByEmail(addUserParams.email)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe(addUserParams.name)
      expect(user.password).toBe(addUserParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const user = await sut.loadByEmail(faker.internet.email())
      expect(user).toBeFalsy()
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const exists = await sut.checkByEmail(addUserParams.email)
      expect(exists).toBe(true)
    })

    test('Should return false if email is not valid', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(faker.internet.email())
      expect(exists).toBe(false)
    })
  })

  describe('loadAll()', () => {
    test('Should return a list of Users on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const users = await sut.loadAll()
      expect(users).toBeTruthy()
      expect(users[0].id).toBeTruthy()
      expect(users[0].name).toBe(addUserParams.name)
      expect(users[0].role).toBe(addUserParams.role)
      expect(users[0].email).toBe(addUserParams.email)
      expect(users[0].password).toBeFalsy()
    })

    test('Should return empty array', async () => {
      const sut = makeSut()
      const users = await sut.loadAll()
      expect(users).toEqual([])
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the user accessToken on success', async () => {
      const sut = makeSut()
      const res = await userCollection.insertOne(mockAddUserParams())
      const fakeUser = res.ops[0]
      expect(fakeUser.accessToken).toBeFalsy()
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(fakeUser._id, accessToken)
      const user = await userCollection.findOne({ _id: fakeUser._id })
      expect(user).toBeTruthy()
      expect(user.accessToken).toBe(accessToken)
    })
  })

  describe('delete()', () => {
    test('Should return true on deletion success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      const userInserted = await userCollection.insertOne(addUserParams)
      const result = await sut.delete(userInserted.insertedId)
      expect(result).toBe(true)
    })

    test('Should return false if User not found', async () => {
      const sut = makeSut()
      const fakeObjectId = new ObjectId()
      const result = await sut.delete(fakeObjectId.id)
      expect(result).toBe(false)
    })
  })
})