const connection = require("../db/connection");

exports.selectCommentsByArticleId = (article_id, sentOrder, sentSortBy) => {
  const order = sentOrder || "desc";
  const sort_by = sentSortBy || "created_at";
  return connection("comments")
    .select("comment_id", "author", "votes", "created_at", "body")
    .where({ article_id })
    .orderBy(sort_by, order)
    .returning("*")
    .then((comments) => {
      if (comments.length < 1)
        return Promise.reject({
          status: 404,
          msg: "Article not found.",
        });
      return comments;
    });
};