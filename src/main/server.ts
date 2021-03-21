import 'module-alias/register'
import * as dotenv from 'dotenv'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

dotenv.config()

console.log('Connecting with database...')
MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Database Connected...')
    const app = (await import('./config/app')).default
    console.log('Connecting application...')
    app.listen(process.env.PORT, () => {
      console.log(`Application listening to Port: ${process.env.PORT}`)
    })
  })
  .catch(console.error)
