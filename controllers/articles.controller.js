const {
  fetchArticleById,
  removeArticleById,
  amendArticleById,
} = require("../models/articles.models");

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  removeArticleById(article_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  amendArticleById(article_id, inc_votes)
    .then((article) => {
      res.send({ article });
    })
    .catch(next);
};
