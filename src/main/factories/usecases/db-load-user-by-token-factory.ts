import { LoadUserByToken } from '@/domain/usecases'
import { DbLoadUserByToken } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb'
import { JwtAdapter } from '@/infra/criptography'

export const makeDbLoadUserByToken = (): LoadUserByToken => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUserByToken(jwtAdapter, userMongoRepository)
}
