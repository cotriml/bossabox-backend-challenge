export const addUserParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  },
  required: ['name', 'role', 'email', 'password', 'passwordConfirmation']
}
