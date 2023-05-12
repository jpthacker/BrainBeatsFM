var express = require('express');
var router = express.Router();

const UsersController = require('../../controllers/users');

/* GET users listing. */
router.post("/", UsersController.Create);
router.get("/:userID", UsersController.Index);
router.get("/", UsersController.All);

module.exports = router;
