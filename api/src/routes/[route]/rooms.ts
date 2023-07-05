import express from "express";
import validateResource from "../../middleware/validateResource";

var router = express.Router();

import RoomsController from "../../controllers/rooms";
import { createRoomSchema } from "../../schema/room.schema";

/* GET users listing. */
router.post("/", validateResource(createRoomSchema), RoomsController.Create);
router.get("/", RoomsController.Index);
router.get("/:name", RoomsController.Find);

export default router;
