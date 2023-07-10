import express from "express";
const router = express.Router();

import TracksController from "../../controllers/tracks";
import validate from "../../middleware/validateResource";
import { createTrackSchema } from "../../schema/track.schema";

/* GET tracks listing. */
router.get("/:genre", TracksController.Index);
router.get("/", TracksController.User);

/* POST tracks listing. */
router.post("/:title", TracksController.Votes);
router.post("/", validate(createTrackSchema), TracksController.Create);

export default router;
