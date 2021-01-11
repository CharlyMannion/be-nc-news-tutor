const express = require('express');
const app = express();
const { handleInvalidPath } = require('./errors');
const apiRouter = require('./routes/api.router');

//essential in order to use the req.body and req.params in the controllers
app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', handleInvalidPath);

module.exports = app;