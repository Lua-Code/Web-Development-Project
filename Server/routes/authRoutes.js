import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/seller-login", authController.loginSeller);
router.post("/buyer-login", authController.loginBuyer);
router.post("/logout", authController.logout);
router.get("/me", authController.getCurrentUser); //meow meow

export default router;