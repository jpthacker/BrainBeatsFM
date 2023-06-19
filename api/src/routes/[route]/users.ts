import express from "express";
var router = express.Router();

import UsersController from "../../controllers/users";

/* GET users listing. */
router.post("/", UsersController.Create);
router.post("/:username", UsersController.Update);
router.get("/:userID", UsersController.Index);
router.get("/", UsersController.All);

export default router;
