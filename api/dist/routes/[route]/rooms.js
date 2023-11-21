"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
var router = express_1.default.Router();
const rooms_1 = __importDefault(require("../../controllers/rooms"));
const room_schema_1 = require("../../schema/room.schema");
/* GET users listing. */
router.post("/", (0, validateResource_1.default)(room_schema_1.createRoomSchema), rooms_1.default.Create);
router.get("/", rooms_1.default.Index);
router.get("/:name", rooms_1.default.Find);
exports.default = router;
