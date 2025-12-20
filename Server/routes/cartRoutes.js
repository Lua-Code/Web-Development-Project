import express from "express";
const router = express.Router();
import { addToCart } from "../controllers/cartController.js";


router.post("/",addToCart);

export default router;