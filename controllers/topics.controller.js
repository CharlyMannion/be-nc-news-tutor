const { getTopics } = require('../models/topics.models');

exports.getTopics = (req, res, next) => {
    getTopics()
    .then((topics) => {
      res.send({ topics });
    })
    .catch(next);
};