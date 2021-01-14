const {
  fetchArticles,
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
  amendArticleById(article_id, req.body)
    .then((article) => {
      res.send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { order, sort_by, author, topic } = req.query;
  fetchArticles(order, sort_by, author, topic)
    .then((articles) => {
      res.send({ articles });
    })
    .catch(next);
};
