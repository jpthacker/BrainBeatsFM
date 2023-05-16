var express = require("express");
var router = express.Router();

const TracksController = require("../../controllers/tracks");

/* GET tracks listing. */
router.get("/:genre", TracksController.Index);
router.post("/", TracksController.Create);

module.exports = router;
