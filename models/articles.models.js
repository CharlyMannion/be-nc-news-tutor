const connection = require('../db/connection');

exports.removeArticleById = (article_id) => {
    return connection('articles').del().where({ article_id });
}