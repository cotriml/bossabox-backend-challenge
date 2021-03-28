import { adaptRoute } from '@/main/adapters'
import { makeAddToolController, makeDeleteToolController, makeLoadToolsController } from '@/main/factories'
import { Router } from 'express'
import { adminAuth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/tools', adminAuth, adaptRoute(makeAddToolController()))
  router.get('/tools', adminAuth, adaptRoute(makeLoadToolsController()))
  router.delete('/tools/:toolId', adminAuth, adaptRoute(makeDeleteToolController()))
}
