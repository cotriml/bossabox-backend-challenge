export const usersSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        $ref: '#/schemas/user'
      }
    },
    metadata: {
      type: 'object',
      $ref: '#/schemas/metadata'
    }
  }
}
