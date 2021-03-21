import * as dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/bossabox-backend-challenge',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'ASd=123d'
}
