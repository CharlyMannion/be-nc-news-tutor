const { fetchUserById } = require('../models/users.models');

exports.getUserById = (req, res, next) => {
    const { username } = req.params;
    fetchUserById(username)
    .then((user) => {
        res.send({ user })
    })
    .catch(next);
}