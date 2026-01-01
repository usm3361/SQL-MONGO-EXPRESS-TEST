import express from "express";
import { createUser } from "../controllers/users.js";

const router = express.Router();

router.route("/register").post(createUser)

  

export default router;
