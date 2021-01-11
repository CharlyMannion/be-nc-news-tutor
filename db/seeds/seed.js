const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");
const { formatTime, createLookUp } = require('../utils/data-manipulation')

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
      const formattedArticles = formatTime(articleData)
      return knex('articles')
      .insert(formattedArticles)
      .returning('*')
    })
    .then((insertedArticles) => {
      const lookUpArticles = createLookUp(insertedArticles);
      console.log(lookUpArticles);
      return knex('comments')
      .insert(commentData)
      .returning('*')
    })
};
