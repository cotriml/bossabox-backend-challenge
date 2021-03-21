export const deleteUserPath = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['User'],
    summary: 'API para deletar usuário',
    parameters: [{
      in: 'path',
      name: 'userId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        description: 'Sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
