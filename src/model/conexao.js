// Importa o módulo Knex
const knex = require('knex');

// Configuração da conexão com o MySQL
const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'desafio_imdb'
  }
});

module.exports = db;