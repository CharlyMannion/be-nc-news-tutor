// error handling middleware functions (EHMF):

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle400s = (err, req, res, next) => {
  const codes = ["23502", "23505", "22P02", "42703"];
  if (codes.includes(err.code)) res.status(400).send({ msg: "Bad request." });
  else next(err);
};

exports.handle404s = (err, req, res, next) => {
  if ((err.code = "23503")) res.status(404).send({ msg: "Not found." });
  else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server error." });
};

// error controllers:

exports.handleInvalidPath = (req, res, next) => {
  res.status(404).send({ msg: "Oopsie, Path Not Found!" });
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed." });
};
