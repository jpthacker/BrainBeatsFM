"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const token_generator_1 = __importDefault(require("../models/token_generator"));
const UsersController = {
    Create: (req, res) => {
        const user = new user_1.default(req.body);
        user
            .save()
            .then(() => {
            res.status(201).json({ message: "OK" });
        })
            .catch((err) => {
            res.status(400).json({ message: "Bad request" });
        });
    },
    Index: async (req, res) => {
        const userID = req.params.userID;
        try {
            const user = await user_1.default.findById(userID).exec();
            let token;
            if (user) {
                token = token_generator_1.default.jsonwebtoken(user._id);
            }
            res.status(200).json({ user: user, token: token });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
    All: async (req, res) => {
        try {
            const users = await user_1.default.find().exec();
            res.status(200).json({ users: users });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
    Update: async (req, res) => {
        const username = req.params.username;
        try {
            console.log(req);
            const user = await user_1.default.findOneAndUpdate({ name: username }, {
                name: req.body.name,
                password: req.body.password,
                image: req.body.image,
            }, { new: true }).exec();
            res.status(200).json({ user: user, req: req.body });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
};
exports.default = UsersController;
