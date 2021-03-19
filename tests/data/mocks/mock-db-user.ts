import {
  AddUserRepository,
  CheckUserByEmailRepository
} from '@/data/protocols'

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
