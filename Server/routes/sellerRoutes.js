const express = require("express");
const router = express.Router();
import * as sellerController from "../controllers/sellerController";

//Get Seller Analytics
router.get("/analytics/:sellerId", sellerController.getSellerAnalytics);


// Export router
export default router;