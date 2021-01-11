const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

exports.seed = function (knex) {
  // add seeding functionality here
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertion = knex("topics").insert(topicData);
      const usersInsertion = knex("users").insert(userData);
      return Promise.all([topicsInsertion, usersInsertion])
    })
    .then(() => {
      return knex('articles')
      .insert(articleData)
      .returning('*')
    });
};
