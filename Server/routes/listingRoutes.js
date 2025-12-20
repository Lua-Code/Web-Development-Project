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
router.get("/", listingController.getBrowseListings);

// =======================
// Buyer Product Page
// GET /api/listings/:id
// =======================
router.get("/:id", listingController.getListingById);

// Export router
export default router;
