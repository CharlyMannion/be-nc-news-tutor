const {
  selectCommentsByArticleId,
  addArticleComment,
} = require("../models/articlesComments.models");

exports.getArticlesComments = (req, res, next) => {
  const { article_id } = req.params;
  const { order, sort_by } = req.query;
  selectCommentsByArticleId(article_id, order, sort_by)
    .then((comments) => {
      res.send({ comments });
    })
    .catch(next);
};

exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;
  addArticleComment(article_id, body, username)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
