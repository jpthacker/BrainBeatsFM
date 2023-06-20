"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const users_1 = __importDefault(require("../../controllers/users"));
/* GET users listing. */
router.post("/", users_1.default.Create);
router.post("/:username", users_1.default.Update);
router.get("/:userID", users_1.default.Index);
router.get("/", users_1.default.All);
exports.default = router;
