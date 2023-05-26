const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require('./itemRoutes');
const app = express();
const morgan = require("morgan");
// const bodyParser = require("body-parser")

app.use(express.json());
app.use(morgan('dev'));

app.use('/items', itemRoutes)

module.exports = app;
