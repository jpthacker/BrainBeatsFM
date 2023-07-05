import express from "express";
import validate from "../../middleware/validateResource";

var router = express.Router();

import RoomsController from "../../controllers/rooms";
import { createRoomSchema } from "../../schema/room.schema";

/* GET users listing. */
router.post("/", validate(createRoomSchema), RoomsController.Create);
router.get("/", RoomsController.Index);
router.get("/:name", RoomsController.Find);

export default router;
