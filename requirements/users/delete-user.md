# Deletar Usuário

> ## Caso de Sucesso ✅

1. Recebe uma requisição do tipo DELETE na rota /api/users
2. Valida se a requisição foi feita por um usuário autenticado
3. Valida parâmetros obrigatórios **userId**
4. Deleta um usuário no banco de dados
5. Retorna 204

> ## Exceções ❌

1. Retorna erro 404 se API não existir
2. Retorna erro 403 se usuário não autenticado
3. Retorna erro 400 se ausência de parâmetros obrigatórios
4. Retorna erro 403 usuário não existir
5. Retorna erro 500 se erro ao tentar deletar o usuário