const connection = require("../db/connection");

exports.selectCommentsByArticleId = (article_id) => {
  return connection("comments")
    .select("comment_id", "author", "votes", "created_at", "body")
    .where({ article_id })
    .returning("*")
    .then((comments) => {
      return comments;
    });
};
