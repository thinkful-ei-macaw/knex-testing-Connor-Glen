require('dotenv').config()
const knex = require('knex')
const ArticlesService = require('./articles-service')

console.log(process.env.DB_URL)

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

knexInstance('blogful_articles')
    .select('*')
    .then(console.log)

// console.log(ArticlesService.getAllArticles())