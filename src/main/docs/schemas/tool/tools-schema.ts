export const toolsSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        $ref: '#/schemas/tool'
      }
    },
    metadata: {
      type: 'object',
      $ref: '#/schemas/metadata'
    }
  }
}
