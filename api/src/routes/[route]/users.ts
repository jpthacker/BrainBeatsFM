import express from "express";
import validate from "../../middleware/validateResource";

var router = express.Router();

import UsersController from "../../controllers/users";
import { createUserSchema } from "../../schema/user.schema";

/* GET users listing. */
router.post("/", validate(createUserSchema), UsersController.Create);
router.post("/:username", UsersController.Update);
router.get("/:userID", UsersController.Index);
router.get("/", UsersController.All);

export default router;
