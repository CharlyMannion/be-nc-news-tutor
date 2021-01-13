const connection = require("../db/connection");

exports.removeArticleById = (article_id) => {
  return connection("articles")
    .del()
    .where({ article_id })
    .then((deleteCount) => {
      if (deleteCount < 1)
        return Promise.reject({
          status: 404,
          msg: "Article not found.",
        });
    });
};

exports.fetchArticleById = (article_id) => {
  return connection
    .first("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .count("comments AS comment_count")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .then((article) => {
      if (!article)
        return Promise.reject({
          status: 404,
          msg: "Article Not Found.",
        });
      return article;
    });
};

exports.amendArticleById = (article_id, reqBody) => {
  const inc_votes = reqBody.inc_votes;
  if (inc_votes === undefined || Object.keys(reqBody).length > 1) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: malformed/ missing body.",
    });
  }
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .then(() => {
      return connection
        .first("articles.*")
        .from("articles")
        .where("articles.article_id", article_id)
        .then((article) => {
          if (!article)
            return Promise.reject({
              status: 404,
              msg: "Article Not Found.",
            });
          else return article;
        });
    });
};
