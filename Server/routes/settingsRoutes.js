// routes/settingsRoutes.js
import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";
import * as settingsController from "../controllers/settingsController.js";

// console.log({
//   authType: typeof auth,
//   getSettingsType: typeof settingsController.getSettings
// });

router.get("/", auth, settingsController.getSettings);
router.put("/privacy", auth, settingsController.updatePrivacy);
router.put("/notifications", auth, settingsController.updateNotifications);
router.put("/password", auth, settingsController.changePassword);

export default router;
