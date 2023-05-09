var express = require('express');
const UsersController = require('../controllers/users');
var router = express.Router();

/* GET users listing. */
router.post('/', UsersController.Create);
router.get('/:userID', UsersController.Index);

module.exports = router;
