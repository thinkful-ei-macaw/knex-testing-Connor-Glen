const knex = require('knex');
require('dotenv').config();

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

function getItems(search) {
    knexInstance
        .from('shopping_list')
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .where('name', 'ILIKE', `%${search}%`)
        .then(result => {
            console.log(result)
        })

}

function paginateItems(pageNumber) {

    const productPerPage = 6;
    const offset = productPerPage * (pageNumber - 1);
    knexInstance
        .from('shopping_list')
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .limit(productPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })

}

function itemsAfterDate(daysAgo) {
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .where('date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log('Products added days ago')
            console.log(result)
        })
}

function totalCost() {
    knexInstance
        .select('category')
        .sum('price')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log('COST PER CATEGORY')
            console.log(result)
        })
}

itemsAfterDate(9)
totalCost()


