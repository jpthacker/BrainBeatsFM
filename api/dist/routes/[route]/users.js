"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
var router = express_1.default.Router();
const users_1 = __importDefault(require("../../controllers/users"));
const user_schema_1 = require("../../schema/user.schema");
/* GET users listing. */
router.post("/", (0, validateResource_1.default)(user_schema_1.createUserSchema), users_1.default.Create);
router.post("/:username", users_1.default.Update);
router.get("/:userID", users_1.default.Index);
router.get("/", users_1.default.All);
exports.default = router;
