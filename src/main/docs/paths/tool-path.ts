export const toolPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Tool'],
    summary: 'Cadastrar uma ferramenta',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addToolParams'
          }
        }
      }
    },
    responses: {
      201: {
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
  },
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Tool'],
    summary: 'Listar ferramentas',
    parameters: [{
      in: 'query',
      name: 'tag',
      required: false,
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'pageSize',
      required: false,
      schema: {
        type: 'integer',
        maximum: 100
      }
    }, {
      in: 'query',
      name: 'currentPage',
      required: false,
      schema: {
        type: 'integer'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/tools'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
