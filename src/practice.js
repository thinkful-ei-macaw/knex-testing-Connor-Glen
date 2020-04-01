const knex = require('knex')
require('dotenv').config() //This is reading from the .env file to grab your values

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})


function searchProduceName(searchTerm) {
    knexInstance
        .from('amazong_products')
        .select('product_id', 'name', 'price', 'category')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}


function paginateProducts(page) {
    const productsPerPage = 10
    const offset = productsPerPage * (page - 1)
    knexInstance
        .from('amazong_products')
        .select('product_id', 'name', 'price', 'category')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

function getProductsWithImages() {
    knexInstance
        .select('product_id', 'name', 'price', 'category', 'image')
        .from('amazong_products')
        .whereNotNull('image')
        .then(result => {
            console.log(result)
        })
}



function mostPopularVideosForDays(days) {
    knexInstance
        .select('video_name', 'region')
        .count('date_viewed AS views')
        .where('date_viewed',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
        )
        .from('whopipe_video_views')
        .groupBy('video_name', 'region')
        .orderBy([
            { column: 'region', order: 'ASC' },
            { column: 'views', order: 'DESC' }
        ])
        .then(result => {
            console.log(result)
            console.log(result.length)
        })
}



console.log('knex and driver installed correctly')

