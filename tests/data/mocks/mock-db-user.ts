import {
  AddUserRepository,
  CheckUserByEmailRepository,
  LoadUserByEmailRepository
} from '@/data/protocols'

import faker from 'faker'

export class AddUserRepositorySpy implements AddUserRepository {
  result = true
  addUserParams: AddUserRepository.Params

  async add (data: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    this.addUserParams = data
    return this.result
  }
}

export class CheckUserByEmailRepositorySpy implements CheckUserByEmailRepository {
  result = false
  email: string

  async checkByEmail (email: string): Promise<CheckUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  result = {
    id: faker.random.uuid(),
    role: faker.random.word(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  email: string

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
