# Listar Usuários

> ## Caso de Sucesso ✅

1. Recebe uma requisição do tipo GET na rota /api/users
2. Valida se a requisição foi feita por um usuário autenticado
5. Retorna 200 com uma lista de todos os usuários

> ## Exceções ❌

1. Retorna erro 404 se API não existir
2. Retorna erro 403 se usuário não autenticado
3. Retorna erro 500 se erro ao tentar listar usuários