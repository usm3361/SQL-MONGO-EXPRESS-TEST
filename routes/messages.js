import express from "express";
// import { createOrder, getAllOrders, getOrder } from "../controllers/messages.js";

const router = express.Router();

router.route("/");
router.route("/:id");

export default router;
