// error handling middleware functions (EHMF):

exports.handle400s = (err, req, res, next) => {
const codes = ['23502', '23505']

if (codes.includes(err.code)) res.status(400).send({msg:"Bad request."})

else next(err)
}

exports.handle500s = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg:"Server error."})
}
// error controllers:

exports.handleInvalidPath = (req, res, next) => {
    res.status(404).send({ msg: "Oopsie, Path Not Found!" });
};


