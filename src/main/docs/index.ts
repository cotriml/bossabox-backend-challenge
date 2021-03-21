import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'BossaBox Backend Challenge por Lucas Cotrim Machado',
    description: 'API VUTTR (Very Useful Tools to Remember), simples repositório para gerenciar ferramentas',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'User'
  }, {
    name: 'Tool'
  }],
  paths: paths,
  schemas: schemas,
  components: components
}
