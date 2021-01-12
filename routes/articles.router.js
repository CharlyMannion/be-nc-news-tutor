const articlesRouter = require("express").Router();
const { deleteArticleById } = require('../controllers/articles.controller');
const { handle405s } = require('../errors');

articlesRouter.route('/:article_id')
            .delete(deleteArticleById)
            .all(handle405s)


module.exports = articlesRouter;