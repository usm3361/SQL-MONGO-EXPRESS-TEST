import express from "express";
import { createReverse, reverseDecrypt } from "../controllers/messages.js";

const router = express.Router();

router.route("/encrypt").post(createReverse);
router.route("/decrypt").post(reverseDecrypt)

export default router;
