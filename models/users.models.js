const connection = require('../db/connection');

exports.fetchUserById = (username) => {
    return connection
    .first("users.*")
    .from("users")
    .where("users.username", username)
    .then((user) => {
        if (!user) 
        return Promise.reject({
            status: 404, 
            msg: "User not found."
        })
        return user;
    })
}