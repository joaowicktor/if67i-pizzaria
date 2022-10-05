# IF67I - Programação Web 2

Esse projeto tem como objetivo atender os requisitos da avaliação de suficiência para a disciplica IF67I (Programação Web 2) referentes ao desenvolvimento de uma API REST em NodeJS (Javascript).

## 💻 Rodando o projeto

Após clonar o projeto, acesse a pasta e siga as instruções abaixo.

Por questão de segurança, as variáveis de ambiente e os usuários para teste foram informados por e-mail. Para as variáveis de ambiente é somente colar o arquivo `.env` (disponibilizado em anexo no e-mail) na raiz do projeto.

```bash
# Instale as dependências com yarn (ou npm)
yarn

# Rode o projeto em ambiente de desenvolvimento
yarn dev
```

⚠️ Por padrão, todas as requisições com métodos HTTP POST, PUT e PATCH utilizam `application/json` no body para envio de dados, exceto pela rota POST `/posts` que utiliza do `multipart/form-data` por conta do envio de imagem da publicação. O formato para essa requisição é o seguinte:

- **data**: Campo com dados da publicação em formato json
- **image**: Campo para upload de imagem