import { AddUser, Authentication } from '@/domain/usecases'
import faker from 'faker'

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
