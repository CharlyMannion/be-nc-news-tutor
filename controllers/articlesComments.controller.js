const {
  selectCommentsByArticleId,
} = require("../models/articlesComments.models");

exports.getArticlesComments = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.send({ comments });
    })
    .catch(next);
};
