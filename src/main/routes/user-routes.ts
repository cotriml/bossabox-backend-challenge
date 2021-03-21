import { adaptRoute } from '@/main/adapters'
import { makeUserController, makeSigninController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeUserController()))
  router.post('/users/signin', adaptRoute(makeSigninController()))
}
