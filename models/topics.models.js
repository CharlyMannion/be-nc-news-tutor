const connection = require('../db/connection');

exports.fetchTopics = () => {
  return connection('topics').select('*');
};

exports.insertTopic = (slug, description) => {
  return connection('topics')
    .insert({slug, description})
    .returning('*')
}