"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
class TokenGenerator {
    static jsonwebtoken(user_id) {
        return jsonwebtoken_1.default.sign({
            user_id: user_id,
            iat: Math.floor(Date.now() / 1000),
            // Set the JWT token to expire in 10 minutes
            exp: Math.floor(Date.now() / 1000) + 10 * 60,
        }, secret);
    }
}
exports.default = TokenGenerator;
