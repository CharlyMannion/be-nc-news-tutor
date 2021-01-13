const {
  selectCommentsByArticleId,
} = require("../models/articlesComments.models");

exports.getArticlesComments = (req, res, next) => {
  const { article_id } = req.params;
  const { order } = req.query;
  selectCommentsByArticleId(article_id, order)
    .then((comments) => {
      res.send({ comments });
    })
    .catch(next);
};
