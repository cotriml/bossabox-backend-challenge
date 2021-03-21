import { Authentication } from '@/domain/usecases'
import { DbAuthentication } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const accountMongoRepository = new UserMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
