exports.up = function(knex) {
    // console.log('creating articles');
    return knex.schema.createTable('articles', (articlesTable) => {
        articlesTable.increments('article_id').primary();
        articlesTable.string('title');
        articlesTable.text('body');
        articlesTable.integer('votes').defaultTo(0);
        articlesTable.string('topic').references('topics.slug').notNullable();
        articlesTable.string('author').references('users.username').notNullable();
        articlesTable.timestamp('created_at');
    })
}

exports.down = function(knex) {
    // console.log('Dropping articles table');
    return knex.schema.dropTable('articles');
};
