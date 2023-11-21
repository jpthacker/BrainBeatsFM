"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const track_1 = __importDefault(require("../models/track"));
const token_generator_1 = __importDefault(require("../models/token_generator"));
const TracksController = {
    Create: async (req, res) => {
        try {
            const track = new track_1.default(req.body);
            await track.save();
            res.status(201).json({ message: "OK" });
        }
        catch (err) {
            res.status(400).json({ message: "Bad Request" });
        }
    },
    Index: async (req, res) => {
        const genre = req.params.genre;
        try {
            const tracks = await track_1.default.find({ genre: genre }).exec();
            let token;
            if (tracks) {
                token = token_generator_1.default.jsonwebtoken(req.user_id);
            }
            res.status(200).json({ tracks: tracks, token: token });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
    User: async (req, res) => {
        try {
            const tracks = await track_1.default.find({}).exec();
            let token;
            if (tracks) {
                token = token_generator_1.default.jsonwebtoken(req.user_id);
            }
            res.status(200).json({ tracks: tracks, token: token });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
    Votes: async (req, res) => {
        const trackID = req.body.trackID;
        const userID = req.body.userVotes;
        try {
            console.log(req);
            const trackFound = await track_1.default.findOneAndUpdate({ _id: trackID }, { $inc: { votes: 1 }, $push: { userVotes: userID } }, { new: true }).exec();
            res.status(200).json({ track: trackFound, test: userID });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
};
exports.default = TracksController;
