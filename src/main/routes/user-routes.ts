import { adaptRoute } from '@/main/adapters'
import { makeAddUserController, makeSigninController, makeLoadUsersController, makeDeleteUserController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeAddUserController()))
  router.get('/users', adaptRoute(makeLoadUsersController()))
  router.delete('/users/:userId', adaptRoute(makeDeleteUserController()))
  router.post('/users/signin', adaptRoute(makeSigninController()))
}
