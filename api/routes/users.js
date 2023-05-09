var express = require("express");
var router = express.Router();
const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);

module.exports = router;
