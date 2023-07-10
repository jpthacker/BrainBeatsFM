"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrackSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTrackSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: "Name is required",
        }),
        owner: zod_1.default.string({
            required_error: "Description is required",
        }),
        genre: zod_1.default.string({
            required_error: "Genre is required",
        }),
        description: zod_1.default
            .string({
            required_error: "Description is required",
        })
            .max(50, "Description is too long - must be below 50 characters"),
        url: zod_1.default
            .string({
            required_error: "Url is required",
        })
            .url("Url not valid"),
        votes: zod_1.default.number().default(0),
        userVotes: zod_1.default.array(zod_1.default.string()).default([]),
    }),
});
// TO DO: Fix default validation value error (votes, userVotes)
