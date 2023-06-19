import express from "express";
const router = express.Router();

import TracksController from "../../controllers/tracks";

/* GET tracks listing. */
router.get("/:genre", TracksController.Index);
router.get("/", TracksController.User);

/* POST tracks listing. */
router.post("/:title", TracksController.Votes);
router.post("/", TracksController.Create);

module.exports = router;
