"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createRoomSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string({
            required_error: "Name is required",
        })
            .max(15),
        description: zod_1.default.string({
            required_error: "Description is required",
        }),
    }),
});
