// error handling middleware functions (EHMF):

// error controllers:

exports.handleInvalidPath = (req, res, next) => {
    res.status(404).send({ msg: "Oopsie, Path Not Found!" });
};