import createError, { HttpError } from "http-errors";
import express from "express";
import path from "path";
import logger from "morgan";
import parser from "body-parser";

import tokensRouter from "./routes/[route]/tokens";
import usersRouter from "./routes/[route]/users";
import roomsRouter from "./routes/[route]/rooms";
import tracksRouter from "./routes/[route]/tracks";

import type { ErrorRequestHandler, NextFunction } from "express";

var app = express();

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/tokens", parser.json(), tokensRouter);
app.use("/users", parser.json(), usersRouter);
app.use("/rooms", parser.json(), roomsRouter);
app.use("/tracks", parser.json(), tracksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ message: err.message });
  // res.render('error');
} as ErrorRequestHandler);

export default app;
