// import express from "express";
// const router = express.Router();
// //const {} = require("../controllers/listingController");

// // Export router
// export default router;

import express from "express";
const router = express.Router();

// We must import the controller using CommonJS-style exports
import * as listingController from "../controllers/listingController.js";

// =======================
// Buyer Browse Page
// GET /api/listings
// =======================
router.get("/browse", listingController.getBrowseListings);
router.get("/recent", listingController.getRecentListings);
router.get("/count", listingController.getListingCount);

router.get("/me", listingController.getMyListings);
router.get("/:id", listingController.getListingById); 
router.post("/", listingController.createListing);
router.put("/:id", listingController.updateListing); 
router.delete("/:id", listingController.deleteListing);
// Export router
export default router;
