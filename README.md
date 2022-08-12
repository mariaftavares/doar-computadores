
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
# Doar Computadores

Este é um projeto Open Source elaborado pelos participantes do processo seletivo da 
[App Master](https://www.appmasters.io/), tem objetivo de automatizar doações destinada
a instituições.




## Índice

- [Doar Computadores](#doar-computadores)
  - [Índice](#índice)
  - [Rodando localmente](#rodando-localmente)
  - [Rodando os testes](#rodando-os-testes)
  - [Colaboradores](#colaboradores)

## Rodando localmente

Clonando repositório

```bash
git clone https://github.com/app-masters/doar-computadores-backend.git
```

Entre no diretório do projeto

```bash
cd doar-computadores-backend
```

Instalando dependencias

```bash
npm install
```

Configurando variável de ambiente

```bash
Na raiz do projeto crie um arquivo chamado .env seguindo a seguinte estrutura, é 
extremamente importate não dar espaços entre o sinal de = (igual).

Apenas a variável "PORT" é opcional, sendo por padrão 8080.

PORT=3333 //Variável opcional, por padrão a porta é 8080
MYSQL_HOST=host_do_seu_banco
MYSQL_PORT=porta_do_seu_banco
MYSQL_USER=usuario_do_seu_banco
MYSQL_PASSWORD=senha_do_seu_banco
MYSQL_DATABASE=nome_da_database_do_seu_banco
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Colaboradores

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/leofredy"><img src="https://avatars.githubusercontent.com/u/62650643?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Leonardo Frederico da Silva</b></sub></a><br /><a href="https://github.com/App Master/doar-computadores-backend/commits?author=leofredy" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
