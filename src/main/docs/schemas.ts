import {
  errorSchema,
  userSchema,
  usersSchema,
  signinSchema,
  signinParamsSchema,
  addUserParamsSchema,
  toolSchema,
  toolsSchema,
  addToolParamsSchema
} from './schemas/'

export default {
  error: errorSchema,
  user: userSchema,
  users: usersSchema,
  signin: signinSchema,
  signinParams: signinParamsSchema,
  addUserParams: addUserParamsSchema,
  tool: toolSchema,
  tools: toolsSchema,
  addToolParams: addToolParamsSchema
}
