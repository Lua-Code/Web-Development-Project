import express from "express";
const router = express.Router();
import * as categoryController from "../controllers/categoryController.js";

router.get("/", categoryController.getAllCategories);
// Export router
export default router;