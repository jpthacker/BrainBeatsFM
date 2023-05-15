var express = require("express");
var router = express.Router();

const TracksController = require("../../controllers/tracks");

/* GET tracks listing. */
router.get("/", TracksController.Index);

module.exports = router;
