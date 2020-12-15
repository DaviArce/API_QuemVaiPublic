<p align="center">
  
</p>
<h1 align="center">
    <img alt="QuemVai" title="#QuemVai" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/45c1af5b-b48c-4f8b-8502-1b888159d0bd/QuemVaiLogo2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201215T125103Z&X-Amz-Expires=86400&X-Amz-Signature=e013c3a1c0310605d54fa49fab16601e02f3d972814f2012bc732eab2f8794c5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22QuemVaiLogo2.png%22" />
</h1>

<h4 align="center"> 
	🚧  QuemVai Concluído 🚀 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-contribuidores">Contribuidores</a> • 
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto

♻️ O quem vai é um projeto que tem o objetivo de fazer as pessoas sairem mais de casa, ter uma vida mais ativa e saudável, melhor democratização dos espaços públicos, melhorar as interações interpessoais das pessoas sendo as mesmas fazendo todo e qualquer tipo de pessoa se juntarem para fazer algo legal pelo meio da tecnologia que tanto está presente em nossas vidas atualmente


Projeto desenvolvido durante o meu TCC de informática da escola ETEC Professor Horácio Augusto da Silveira do ano de 2020.

---

## ⚙️ Funcionalidades

- [x] Pessoas podem se cadastrar no nosso sistema:
- [x] Caso a pessoa perca sua senha ela pode entrar no esqueci minha senha que o sistema enviará um email para ela com uma nova senha
- [x] O usuário também antes de fazer login ele poderá mandar um e-mail para a gente com suas opiniões sobre o sistema  
- [x] O sistema necessitará de um administrador que poderá:
  - [x] Quadras 
    - [x] Adicionar quadras ao sistema
    - [x] Alterar as informções dela
    - [x] Adicionar esporte a essa quadra
    - [x] Retirar esporte dessa quadra
  - [x] Esportes
    - [x] Adicionar esportes
    - [x] Atualizar informações do esporte
  - [x] Email
    - [x] Responder E-mail
    - [x] Deletar E-mail respondido
    - [x] Ver E-mail respondido       
     
> ❗ O administrador será um usuário que terá as mesmas funcionalidades de um usuário normal mais as funcionalidades de gerenciador do sistema 
- [x] O usuários podem:
  - [x] Alterar suas informações de perfil
  - [x] Alterar sua foto de usuário
  - [x] Deletar seu usuário
  - [x] Alterar sua senha
  - [x] Adicionar amigos a plataforma
  - [x] Buscar um amigo pelo nome dele 
  - [x] Tornar um amigo comum da plataforma em um amigo confiável (após tornar um amigo confiável algumas informações a mais do seu amigo será liberada pra você para melhor interação entre vocês)
  - [x] Criar um evento
  - [x] Entrar em um evento
  - [x] Alterar as informações do evento 
  - [x] Finalizar um evento 
  - [x] Ver quem está participando do evento 
  - [x] Sair de um evento
  - [x] Adicionar uma quadra/parque há sua lista de favoritos
  - [x] Após você criar ou participar de um evento, o mesmo estará constando no histórico do usuário podendo o usuário deletar tal evento  

- [x] Mais ações do usuário:
  - [x] quando uma vez informada a latitude e longitude do usuário o sistema retornará os eventos e quadras/parques que estarão em um raio de 2km dele
  - [x] Buscar eventos que estejam em um raio de 2km do usuário
  - [x] Buscar quadras/parques que estejam em um raio de 2km  
  - [x] O usuário pode buscar as quadras, eventos que existem em um estado

  - [x] Buscar em qual quadra têm X esporte
  - [x] Barra de buscas que trazem os eventos, quadras com X esportes, quadras e usuários   



---

## 🚀 Como executar o projeto


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [MySql]("https://www.mysql.com"). 
Além disto é bom ter um editor para trabalhar com a API como [VSCode](https://code.visualstudio.com/)

#### 🎲 Instalando a API na sua máquina

```bash
# Clone este repositório
$ git clone https://github.com/DaviArce/API_QuemVai/tree/main.git

# Vá para a pasta da API
$ cd API_QuemVai

# Instale as dependências
$ npm install
```

### 🔧 Configurando o Sequelize

```bash
  # Vá para a pasta
  $ cd API_QuemVai/src/config

  # Entre no arquivo
  $ database.json

  # Informe
  {
  "dialect": "", 
  # Qual o banco de dados que estpa sendo usado
  "host": "", 
  # Em qual lugar está sendo rodado o banco de dados
  "username": "",
  # Qual usuário vai rodar o sistema
  "password": "",
  # A senha do usuário
  "database": "",
  # O nome que você vai dar ao seu banco
  "define": {
    "timestamps": false,
    "underscored": true
  }
}
```
### 💾 Criando o banco de dados
```bash
# Criando o banco de dados
$ npx sequelize db:create

# Criando as tabelas do banco de dados
$ npx sequelize db:migrate

# Colocando algumas informações no sistema
$ npx sequelize db:seed:all
```
### 🔒 Configurando a segurança da API
```bash
# Entre no arquivo custom-environment-variables.json
# Ele está na mesma pasta que configuramos o sequelize
{
  # Coloque um valor secreto neste campo para a JWT
  "jwtPrivateKey": "",
  # Coloque um valor inteiro no valor de salt do Bcrypt
  "saltValue": 
}
```
### ✉️ Configurando os E-mail
```bash
# Entre no arquivo emailVariables.json
# Ele está na mesma pasta que configuramos o sequelize

{
  "name": "development environment",
  "mail": {
    "mailSender": {

      # Informe qual será o servidor SMTP
      "host": "Gmail",

      # Informe qual será o Email e senha que vai enviar as mensagens de confirmação para os usuários e para o administrador
      "user": "",
      "password": ""
    },
    "mailGetter": {

      # Informe qual será o Email e senha que responderá os email para os usuários
      "user": "contatochumecompany@gmail.com",
      "password": ""
    }
  }
}
```
### 🌠 Iniciando o servidor
```bash
  # Caso você já tenha o nodemon ou queira instalar dê este comando para executar a API
  $ npm start

  # Caso não tenho o nodemon execute
  $ node src/server.js

  # O servidor inciará na porta:6868 - acesse http://localhost:6868/api 
```
<p align="center">
  <a href="https://drive.google.com/file/d/1oq377H4hnTOVpb0W8d4BBxCJ8tjJ59Zh/view?usp=sharing" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>



---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:



#### **Server** 
-    **[Axios](https://www.npmjs.com/package/axios)**
-    **[Azure-storage](https://www.npmjs.com/package/azure-storage)**
-    **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-    **[Ejs](https://www.npmjs.com/package/ejs)**
-   **[Express](https://expressjs.com/)**
-    **[Guid](https://www.npmjs.com/package/guid)**
-    **[Helmet](https://helmetjs.github.io/)**
-    **[Jsonwebtoken](https://jwt.io/)**
-    **[Moment](https://momentjs.com/)**
-    **[Mysql2](https://www.npmjs.com/package/mysql2)**
-    **[Nodemailer](https://nodemailer.com/about/)**
-    **[Nodemon](https://www.npmjs.com/package/nodemon)**
-    **[Sequelize](https://sequelize.org/)**
-    **[Sequelize-cli](https://www.npmjs.com/package/sequelize-cli)**
-    **[Socket.io](https://socket.io/)**
-    **[Winston](https://www.npmjs.com/package/winston)**

> ! O socket.io não foi testado no client-side




> Veja o arquivo  [package.json](https://github.com/DaviArce/API_QuemVai/blob/main/package.json)



#### **Utilitários**


-   API:  **[MAPBOX](https://www.mapbox.com/)**  
-   Servidor:  **[EC2 AWS](https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc)**
-    Azure cloud storage:  **[Azure Cloud Storage](https://azure.microsoft.com/en-us/free/storage/search/?&ef_id=Cj0KCQiA2uH-BRCCARIsAEeef3kvDwQqKQtkNibX70mu9UHHWreIp9SlvwUiorCy9eLiSD8pghlxoL0aApMAEALw_wcB:G:s&OCID=AID2100014_SEM_Cj0KCQiA2uH-BRCCARIsAEeef3kvDwQqKQtkNibX70mu9UHHWreIp9SlvwUiorCy9eLiSD8pghlxoL0aApMAEALw_wcB:G:s)**
-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**


-   Teste de API:  **[Insomnia](https://insomnia.rest/)**

---
<h1><br>Autor</h1>


<a href="https://www.linkedin.com/in/davi-arce-de-oliveira-b75b411b6/">
 <img style="border-radius: 50%;" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3553ca46-4581-4ef1-998a-60bd99e18227/davi.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201215T125004Z&X-Amz-Expires=86400&X-Amz-Signature=16976cb7ffad29425c8511363b6adb136dbd5efd8fb1364eb3469d0e83b111fd&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22davi.jpg%22" width="100px;" alt=""/>
 <br />
 <sub><b>Davi Arce de Oliveira</b></sub></a> 🚀


Com muito suor e empenho a API do quem vai está pronta  By Davi Arce de Oliveira 👋 Entre em contato!

 [![Linkedin Badge](https://img.shields.io/badge/-Davi-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/davi-arce-de-oliveira-b75b411b6/)](https://www.linkedin.com/in/davi-arce-de-oliveira-b75b411b6/) [![Outlook Badge](https://img.shields.io/badge/-daviarce_oliveira@hotmail.com-c14438?style=flat-square&logo=microsoftoutlook&logoColor=white&link=mailto:daviarce_oliveira@hotmail.com)](mailto:daviarce_oliveira@hotmail.com)

 ## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).





