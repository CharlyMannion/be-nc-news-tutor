const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  deleteArticleById,
  patchArticleById,
} = require("../controllers/articles.controller");
const {
  getArticlesComments,
  postArticleComment,
} = require("../controllers/articlesComments.controller");
const { handle405s } = require("../errors");

articlesRouter
  .route("/")
  .get(getArticles)
  // .post(postArticle)
  .all(handle405s);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .delete(deleteArticleById)
  .patch(patchArticleById)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticlesComments)
  .post(postArticleComment)
  .all(handle405s);

module.exports = articlesRouter;
