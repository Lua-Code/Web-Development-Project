import express from "express";
const router = express.Router();
//const {} = require("../controllers/orderController");

//added////////////

import authMiddleware from "../middleware/authMiddleware.js";
import { getMyOrders, createMyOrder } from "../controllers/orderController.js";

// MyOrders (must be logged in)
router.get("/", authMiddleware, getMyOrders);

// Checkout -> create order (must be logged in)
router.post("/", authMiddleware, createMyOrder);


// Export router
export default router;