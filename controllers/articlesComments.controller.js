const {
  selectCommentsByArticleId,
} = require("../models/articlesComments.models");

exports.getArticlesComments = (req, res, next) => {
  const { article_id } = req.params;
  //   const { sort_by } = req.query;
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.send({ comments });
    })
    .catch(next);
};
