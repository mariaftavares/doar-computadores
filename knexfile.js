const {resolve} = require('path')

module.exports = {
  client: 'mysql2',
  connection: {
    database: 'base_de_dados',
    user: 'usuario',
    password: 'senha'
  },
    migrations: {
      directory: resolve(__dirname,'src', 'database','migrations')
  },
};
