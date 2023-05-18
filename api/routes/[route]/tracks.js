var express = require("express");
var router = express.Router();

const TracksController = require("../../controllers/tracks");

/* GET tracks listing. */
router.get("/:genre", TracksController.Index);
router.get("/", TracksController.User);

/* POST tracks listing. */
router.post("/:title", TracksController.Votes);
router.post("/", TracksController.Create);

module.exports = router;
