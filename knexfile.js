const {resolve} = require('path')
/*
Descomentar para rodar as migrations
require('dotenv-safe/config')
*/
module.exports = {
    client: 'mysql2',
    connection: {
      host : process.env.MYSQL_HOST,
      user : process.env.MYSQL_USER ,
      password : process.env.MYSQL_PASSWORD ,
      database : process.env.MYSQL_DATABASE
   },
    migrations: {
      directory: resolve(__dirname,'src', 'database','migrations')
  },
};