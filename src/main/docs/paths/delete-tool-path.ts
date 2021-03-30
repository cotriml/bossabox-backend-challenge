export const deleteToolPath = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Tool'],
    summary: 'Deletar ferramenta',
    parameters: [{
      in: 'path',
      name: 'toolId',
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
      403: {
        $ref: '#/components/forbidden'
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
