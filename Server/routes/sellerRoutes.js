import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";   
import * as sellerController from "../controllers/sellerController.js";

//Get Seller Analytics
router.get("/analytics", authMiddleware, sellerController.getSellerAnalytics); 


// Export router
export default router;