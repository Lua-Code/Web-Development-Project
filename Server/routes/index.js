import express from "express";
const router = express.Router();

import userRoutes from "./userRoutes.js";
import sellerRoutes from "./sellerRoutes.js";
import listingRoutes from "./listingRoutes.js";
import orderRoutes from "./orderRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import conversationRoutes from "./conversationRoutes.js";
import messageRoutes from "./messageRoutes.js";
import transactionRoutes from "./transactionRoutes.js";
import authRoutes from "./authRoutes.js";

// Mount routers
router.use("/users", userRoutes);
router.use("/seller", sellerRoutes);
router.use("/listings", listingRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);
router.use("/conversations", conversationRoutes);
router.use("/messages", messageRoutes);
router.use("/transactions", transactionRoutes);
router.use("/auth", authRoutes);

export default router;
