"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TrackSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    votes: { type: Number, required: true },
    userVotes: { type: Array, required: true },
});
const Track = mongoose_1.default.model("Track", TrackSchema);
exports.default = Track;
