import express from "express";
import {
  addToCartHandler,
  getCartHandler,
  removeFromCartHandler
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addToCartHandler);
router.get("/", authMiddleware, getCartHandler);
router.delete("/:productId", authMiddleware, removeFromCartHandler);

export default router;
