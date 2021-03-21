import {
  errorSchema,
  userSchema,
  usersSchema,
  signinParamsSchema,
  addUserParamsSchema
} from './schemas/'

export default {
  error: errorSchema,
  user: userSchema,
  users: usersSchema,
  signinParams: signinParamsSchema,
  addUserParams: addUserParamsSchema
}
