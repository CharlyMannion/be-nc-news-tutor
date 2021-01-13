const articlesRouter = require("express").Router();
const {
  getArticleById,
  deleteArticleById,
} = require("../controllers/articles.controller");
const { handle405s } = require("../errors");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .delete(deleteArticleById)
  .all(handle405s);

module.exports = articlesRouter;
