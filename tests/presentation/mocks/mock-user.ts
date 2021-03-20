import {
  AddUser,
  Authentication
} from '@/domain/usecases'
import faker from 'faker'

export class AddUserSpy implements AddUser {
  result = true
  addUserParams: AddUser.Params
  async add (user: AddUser.Params): Promise<AddUser.Result> {
    this.addUserParams = user
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  authenticationParams: Authentication.Params

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams
    return this.result
  }
}
