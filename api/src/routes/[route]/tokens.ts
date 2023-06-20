import express from "express";
const router = express.Router();

import TokensController from "../../controllers/tokens";

router.post("/", TokensController.Create);

export default router;
