import { adaptRoute } from '@/main/adapters'
import { makeUserController, makeSigninController, makeLoadUsersController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeUserController()))
  router.get('/users', adaptRoute(makeLoadUsersController()))
  router.post('/users/signin', adaptRoute(makeSigninController()))
}
