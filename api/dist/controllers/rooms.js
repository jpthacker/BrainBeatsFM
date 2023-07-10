"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("../models/room"));
const token_generator_1 = __importDefault(require("../models/token_generator"));
const RoomController = {
    Create: async (req, res) => {
        try {
            const room = new room_1.default(req.body);
            await room.save();
            res.status(201).json({ message: "OK" });
        }
        catch (err) {
            res.status(400).json({ message: "Bad request" });
        }
    },
    Index: async (req, res) => {
        try {
            const rooms = await room_1.default.find().exec();
            const token = token_generator_1.default.jsonwebtoken(req.user_id);
            res.status(200).json({ rooms: rooms, token: token });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
    Find: async (req, res) => {
        const roomName = req.params.name;
        try {
            const room = await room_1.default.findOne({ name: roomName }).exec();
            const token = token_generator_1.default.jsonwebtoken(req.user_id);
            res.status(200).json({ room: room, token: token });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
};
exports.default = RoomController;
