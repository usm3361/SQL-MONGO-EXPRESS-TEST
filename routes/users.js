import express from "express";
import { getUser } from "../controllers/users.js";

const router = express.Router();

router.route("/me").get(getUser)
  

export default router;
