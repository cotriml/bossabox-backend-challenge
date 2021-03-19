# Adicionar Usuário

> ## Caso de Sucesso ✅

1. Recebe uma requisição do tipo POST na rota /api/users
2. Valida se a requisição foi feita por um usuário autenticado
3. Valida dados obrigatórios **name** | **role** | **email** | **password** | **passwordConfirmation**
4. Valida **email**
5. Valida se já existe usuário com o **email**
6. Gera uma senha criptografada
7. Cria um usuário no banco de dados
8. Retorna 201

> ## Exceções ❌

1. Retorna erro 404 se API não existir
2. Retorna erro 403 se usuário não autenticado
3. Retorna erro 400 se ausência de dados obrigatórios
4. Retorna erro 400 se **email** não for um e-mail válido
5. Retorna erro 403 se **email** fornecido já estiver em uso
6. Retorna erro 500 se der erro ao tentar gerar uma senha criptografada
7. Retorna erro 500 se erro ao tentar criar o usuário