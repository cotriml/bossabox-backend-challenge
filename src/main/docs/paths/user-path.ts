export const userPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['User'],
    summary: 'Criar usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addUserParams'
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
    tags: ['User'],
    summary: 'Listar usuários',
    parameters: [{
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
              $ref: '#/schemas/users'
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
