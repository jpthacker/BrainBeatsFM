import express from "express";
var router = express.Router();

import RoomsController from "../../controllers/rooms";

/* GET users listing. */
router.post("/", RoomsController.Create);
router.get("/", RoomsController.Index);
router.get("/:name", RoomsController.Find);

export default router;
