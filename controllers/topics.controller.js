const { fetchTopics, insertTopic } = require('../models/topics.models');

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
      res.send({ topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) =>{
  const {slug, description} = req.body

  insertTopic(slug,description)
  .then(([topic])=>{
    res.status(201).send({topic})
  })
  .catch(next)
}