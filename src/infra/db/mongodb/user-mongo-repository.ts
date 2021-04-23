import { MongoHelper } from '@/infra/db'
import {
  AddUserRepository,
  DeleteUserRepository,
  LoadUsersRepository,
  CheckUserByEmailRepository,
  LoadUserByEmailRepository,
  UpdateAccessTokenRepository,
  LoadUserByTokenRepository
} from '@/data/protocols/db'
import env from '@/main/config/env'
import { PaginationModel } from '@/domain/models'
import { ObjectId } from 'mongodb'

const usersColletionName = 'users'
const defaultPageSize = +env.defaultPageSizePagination
const defaultCurrentPage = +env.defaultCurrentPagePagination

export class UserMongoRepository implements AddUserRepository, LoadUserByEmailRepository, CheckUserByEmailRepository, LoadUsersRepository, DeleteUserRepository, UpdateAccessTokenRepository, LoadUserByTokenRepository {
  async add (data: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const result = await userCollection.insertOne(data)
    delete result.ops[0]?.password
    return MongoHelper.map(result.ops[0])
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

  async loadAll (pagination?: PaginationModel): Promise<LoadUsersRepository.Result> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const { pageSize, currentPage } = pagination || {}
    const users = await userCollection.find({}, {
      projection: {
        _id: 1,
        email: 1,
        name: 1,
        role: 1
      }
    })
      .skip((pageSize || defaultPageSize) * ((currentPage || defaultCurrentPage) - 1))
      .limit(pageSize || defaultPageSize)
      .toArray()
    return MongoHelper.mapCollection(users)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const teste = await userCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
    console.log(teste)
  }

  async delete (userId: string): Promise<DeleteUserRepository.Result> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const result = await userCollection.deleteOne({ _id: new ObjectId(userId) })
    return result.deletedCount === 1
  }

  async loadByToken (token: string, role: string): Promise<LoadUserByTokenRepository.Result> {
    const userCollection = await MongoHelper.getCollection(usersColletionName)
    const user = await userCollection.findOne({
      accessToken: token,
      role: role
    }, {
      projection: {
        _id: 1
      }
    })
    return user && MongoHelper.map(user)
  }
}
