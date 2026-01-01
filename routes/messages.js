import express from "express";
import { createReverse } from "../controllers/messages.js";

const router = express.Router();

router.route("/encrypt").post(createReverse);
router.route("/:id");

export default router;
