
const topicsRouter = require('express').Router();
const { getTopics, postTopic } = require('../controllers/topics.controller');
const { handle405s } = require('../errors');

topicsRouter.route('/')
            .get(getTopics)
            .post(postTopic)
            .all(handle405s)


module.exports = topicsRouter;