# Autenticar Usuário

> ## Caso de Sucesso ✅

1. Recebe uma requisição do tipo POST na rota /api/users/signin
2. Valida dados obrigatórios **email** | **password**
3. Valida **email**
4. Busca usuário no banco de dados com **email** e **password** fornecidos
5. Gera um token de acesso a partir do **id** do usuário
6. Retorna 200 com token de acesso e nome do usuário

> ## Exceções ❌

1. Retorna erro 404 se API não existir
2. Retorna erro 400 se ausência de dados obrigatórios
3. Retorna erro 400 se **email** não for um e-mail válido
4. Retorna erro 500 se der erro ao buscar usuário no banco de dados
5. Retorna erro 500 se der erro ao gerar token de acesso
6. Retorna erro 500 se erro ao tentar criar o usuário