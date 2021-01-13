const articlesRouter = require("express").Router();
const {
  getArticleById,
  deleteArticleById,
  patchArticleById,
} = require("../controllers/articles.controller");
const {
  getArticlesComments,
} = require("../controllers/articlesComments.controller");
const { handle405s } = require("../errors");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .delete(deleteArticleById)
  .patch(patchArticleById)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticlesComments)
  .all(handle405s);

module.exports = articlesRouter;
