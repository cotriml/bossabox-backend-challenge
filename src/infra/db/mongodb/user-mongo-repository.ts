import { MongoHelper } from '@/infra/db'
import {
  AddUserRepository,
  DeleteUserRepository,
  LoadUsersRepository,
  CheckUserByEmailRepository,
  LoadUserByEmailRepository
} from '@/data/protocols/db'

const usersColletionName = 'users'

export class UserMongoRepository implements AddUserRepository, LoadUserByEmailRepository, CheckUserByEmailRepository, LoadUsersRepository, DeleteUserRepository {
  async add (data: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const result = await userCollection.insertOne(data)
    return result.ops[0] !== null
  }

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const user = await userCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return user && MongoHelper.map(user)
  }

  async checkByEmail (email: string): Promise<CheckUserByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const user = await userCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return user !== null
  }

  async loadAll (): Promise<LoadUsersRepository.Result> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const users = await userCollection.find({}, {
      projection: {
        _id: 1,
        email: 1,
        name: 1,
        role: 1
      }
    }).toArray()
    return MongoHelper.mapCollection(users)
  }

  async delete (userId: string): Promise<DeleteUserRepository.Result> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const result = await userCollection.deleteOne({ _id: userId })
    return result.deletedCount === 1
  }
}
