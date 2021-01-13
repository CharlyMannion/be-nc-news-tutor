const {
  selectCommentsByArticleId,
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
  res.send(201);
};
