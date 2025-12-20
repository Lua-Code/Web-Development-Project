import express from "express";
const router = express.Router();

import authMiddleware from "../middleware/authMiddleware.js";
import { checkout } from "../controllers/transactionController.js";

// POST /api/transactions/checkout
router.post("/checkout", authMiddleware, checkout);

export default router;
