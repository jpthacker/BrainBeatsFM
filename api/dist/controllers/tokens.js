"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const token_generator_1 = __importDefault(require("../models/token_generator"));
const SessionsController = {
    Create: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        user_1.default.findOne({ email: email }).then(async (user) => {
            if (!user) {
                console.log("auth error: user not found");
                res.status(401).json({ message: "auth error" });
            }
            else if (user.password !== password) {
                console.log("auth error: passwords do not match");
                res.status(401).json({ message: "auth error" });
            }
            else {
                const token = token_generator_1.default.jsonwebtoken(user._id);
                res.status(201).json({
                    userID: user._id,
                    image: user.image,
                    username: user.name,
                    password: user.password,
                    token: token,
                    message: "OK",
                });
            }
        });
    },
};
exports.default = SessionsController;
