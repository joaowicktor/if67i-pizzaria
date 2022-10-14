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

⚠️ Por padrão, todas as requisições com métodos HTTP POST, PUT e PATCH utilizam `application/json` no body para envio de dados, exceto pela rota POST `/pizzas` que utiliza do `multipart/form-data` por conta do envio de imagem da publicação. O formato para essa requisição é o seguinte:

- **data**: Campo com dados da publicação em formato json
- **image**: Campo para upload de imagem

### Observações

- O sistema possui rotas públicas e privadas utilizando o conceito de `JWT + RefreshToken` conforme solicitado nos requisitos do projeto.
- Para o banco de dados está sendo utilizado o banco NoSQL `MongoDB` na plataforma cloud MongoDB Atlas.
- O sistema de permissões do projeto é baseado no conceito `RBAC` (Role-based access control), portanto, usuários possuem papéis e os papéis possuem N permissões. Por padrão estão disponíveis os papéis `ADMIN`, `MANAGER` e `USER`, cada um com suas restrições de acesso aos recursos do sistema. As permissões disponíveis estão descritas na tabela abaixo:
  | Chave       	| Descrição                         	|
  |-------------	|-----------------------------------	|
  | read:user   	| Permite listar os usuários        	|
  | create:user 	| Permite criar um novo usuário     	|
  | edit:user   	| Permite editar um usuário         	|
  | delete:user 	| Permite deletar um usuário        	|
  | read:role   	| Permite listar os papéis          	|
  | create:role 	| Permite criar um novo papel       	|
  | edit:role   	| Permite editar um papel           	|
  | delete:role 	| Permite deletar um papel          	|
  | create:pizza 	| Permite fazer uma nova publicação de pizza 	|
- A demonstração do projeto está disponível na plataforma `Heroku` pela URL [https://if67i-pizzaria.herokuapp.com](https://if67i-pizzaria.herokuapp.com/), conforme solicitado em um dos itens complementares descritos no projeto.