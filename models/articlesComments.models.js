const connection = require("../db/connection");

exports.selectCommentsByArticleId = (article_id, sentOrder, sentSortBy) => {
  const order = sentOrder || "desc";
  const sort_by = sentSortBy || "created_at";
  const validOrders = ["asc", "desc"];
  if (validOrders.includes(order)) {
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
  } else {
    return Promise.reject({
      status: 400,
      msg: "Bad request: invalid order query.",
    });
  }
};

exports.addArticleComment = (article_id, body, username) => {
  const author = username;
  return connection("comments")
    .insert({ body, article_id, author })
    .returning("*")
    .then((comment) => {
      return comment[0];
    });
};
