"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        image: zod_1.default.string({
            required_error: "Image is required",
        }),
        name: zod_1.default
            .string({
            required_error: "Name is required",
        })
            .max(18, "Name is too long - must be below 18 characters"),
        email: zod_1.default
            .string({
            required_error: "Email is required",
        })
            .email("Not a valid email"),
        password: zod_1.default.string({
            required_error: "Password is required",
        }),
    }),
});
