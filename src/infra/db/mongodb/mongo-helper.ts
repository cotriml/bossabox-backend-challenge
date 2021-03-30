import { UserModel } from '@/domain/models'
import env from '@/main/config/env'
import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const exist = await this.checkCollectionExist('users')
    if (!exist) {
      console.log(await this.createRootUser())
    }
  },
  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },
  async createRootUser (): Promise<UserModel> {
    const userCollection = await this.getCollection('users')
    const result = await userCollection.insertOne({
      name: env.rootUserName,
      role: 'admin',
      email: env.rootUserEmail,
      password: env.rootUserPassword
    })
    return this.map(result.ops[0])
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  async checkCollectionExist (name: string): Promise<boolean> {
    const collection = await this.client.db().listCollections({ name: name }).toArray()
    return collection.length > 0
  },
  map: (data: any): any => {
    const { _id, ...rest } = data
    return Object.assign({}, rest, { id: _id })
  },
  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
