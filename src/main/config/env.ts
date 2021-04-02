import * as dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/bossabox-backend-challenge',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'ASd=123d',
  rootUserName: process.env.ROOT_USER_NAME || 'root',
  rootUserEmail: process.env.ROOT_USER_EMAIL || 'root@root.com',
  rootUserPassword: process.env.ROOT_USER_PASSWORD || 'root'
}
