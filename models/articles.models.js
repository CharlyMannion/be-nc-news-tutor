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
