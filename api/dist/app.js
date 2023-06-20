"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const tokens_1 = __importDefault(require("./routes/[route]/tokens"));
const users_1 = __importDefault(require("./routes/[route]/users"));
const rooms_1 = __importDefault(require("./routes/[route]/rooms"));
const tracks_1 = __importDefault(require("./routes/[route]/tracks"));
var app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/tokens", body_parser_1.default.json(), tokens_1.default);
app.use("/users", body_parser_1.default.json(), users_1.default);
app.use("/rooms", body_parser_1.default.json(), rooms_1.default);
app.use("/tracks", body_parser_1.default.json(), tracks_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500).json({ message: err.message });
    // res.render('error');
});
exports.default = app;
