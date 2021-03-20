import { AddUser, Authentication } from '@/domain/usecases'
import faker from 'faker'
import { UserModel } from '../models/user'

export const mockAddUserParams = (): AddUser.Params => ({
  name: faker.name.findName(),
  role: faker.random.word(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockUserModel = (): UserModel => {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    role: faker.random.word(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export const mockUsersModels = (): UserModel[] => [
  mockUserModel(),
  mockUserModel()
]
