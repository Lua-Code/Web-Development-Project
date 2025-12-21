import express from "express";
const router = express.Router();
//const {} = require("../controllers/orderController");

//added////////////

import authMiddleware from "../middleware/authMiddleware.js";
import {
    getMyOrders,
    createMyOrder,
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
    getOrdersSeller,
    updateOrderComment
} from "../controllers/orderController.js";

// MyOrders (must be logged in)
router.get("/", authMiddleware, getMyOrders);

// Checkout -> create order (must be logged in)
router.post("/", authMiddleware, createMyOrder);

router.get("/me", getOrdersSeller);
router.patch("/:id/status", updateOrderStatus);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.put("/:id/comment", updateOrderComment);


// Export router
export default router;