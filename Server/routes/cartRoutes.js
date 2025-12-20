import express from "express";
import { addToCartHandler } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addToCartHandler);

export default router;
