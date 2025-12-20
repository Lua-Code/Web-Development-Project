import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";   
import * as sellerController from "../controllers/sellerController.js";

//


//Get Seller Analytics
router.get("/analytics", authMiddleware, sellerController.getSellerAnalytics); 
router.get("/dashboard", authMiddleware, sellerController.getSellerDashboard);
router.get("/me", authMiddleware, sellerController.getCurrentSellerProfile);
router.put("/update", authMiddleware, sellerController.updateSellerProfile);
router.post("/create", authMiddleware, sellerController.createShop);
router.get("/count",sellerController.getSellerCount);
// Export router
export default router;