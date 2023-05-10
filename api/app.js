const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");
const parser = require("body-parser");

const indexRouter = require('./routes/[route]/index');
const tokensRouter = require('./routes/[route]/tokens')
const usersRouter = require('./routes/[route]/users');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/tokens", parser.json(), tokensRouter);
app.use("/users", parser.json(), usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({message: err.message});
  // res.render('error');
});

module.exports = app;