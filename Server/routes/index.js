const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const sellerRoutes = require("./sellerRoutes");
const listingRoutes = require("./listingRoutes");
const orderRoutes = require("./orderRoutes");
const reviewRoutes = require("./reviewRoutes");
const conversationRoutes = require("./conversationRoutes");
const messageRoutes = require("./messageRoutes");
const transactionRoutes = require("./transactionRoutes");
const authRoutes = require("./authRoutes");

// Mount routers
router.use("/users", userRoutes);
router.use("/sellers", sellerRoutes);
router.use("/listings", listingRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);
router.use("/conversations", conversationRoutes);
router.use("/messages", messageRoutes);
router.use("/transactions", transactionRoutes);
router.use("/auth", authRoutes);

module.exports = router;
