# Adicionar Ferramenta

> ## Caso de Sucesso ✅

1. Recebe uma requisição do tipo POST na rota /api/tools
2. Valida se a requisição foi feita por um usuário autenticado
3. Valida dados obrigatórios **title** | **link** | **description** | **tags**
7. Cria uma ferramenta no banco de dados
8. Retorna 201 com objeto criado

> ## Exceções ❌

1. Retorna erro 404 se API não existir
2. Retorna erro 403 se usuário não autenticado
3. Retorna erro 400 se ausência de dados obrigatórios
7. Retorna erro 500 se erro ao tentar criar a ferramenta