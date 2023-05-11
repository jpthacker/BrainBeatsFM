var express = require('express');
var router = express.Router();

const RoomsController = require('../../controllers/rooms');

/* GET users listing. */
router.post("/", RoomsController.Create);
router.get("/", RoomsController.Index);

module.exports = router;
