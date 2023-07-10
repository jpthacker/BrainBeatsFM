"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tracks_1 = __importDefault(require("../../controllers/tracks"));
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const track_schema_1 = require("../../schema/track.schema");
/* GET tracks listing. */
router.get("/:genre", tracks_1.default.Index);
router.get("/", tracks_1.default.User);
/* POST tracks listing. */
router.post("/:title", tracks_1.default.Votes);
router.post("/", (0, validateResource_1.default)(track_schema_1.createTrackSchema), tracks_1.default.Create);
exports.default = router;
