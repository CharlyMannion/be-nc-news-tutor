const { removeArticleById } = require('../models/articles.models');

exports.deleteArticleById = (req, res, next) => {
    const { article_id } = req.params;
    removeArticleById(article_id)
    .then(() => {
        res.sendStatus(204)
    })
    .catch(next)
}