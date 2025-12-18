import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authController.getCurrentUser); //meow meow

export default router;