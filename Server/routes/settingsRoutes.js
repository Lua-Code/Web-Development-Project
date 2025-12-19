// routes/settingsRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const settingsController = require("../controllers/settingsController");
console.log({
  authType: typeof auth,
  getSettingsType: typeof settingsController.getSettings
});



router.get("/", auth, settingsController.getSettings);
router.put("/privacy", auth, settingsController.updatePrivacy);
router.put("/notifications", auth, settingsController.updateNotifications);
router.put("/password", auth, settingsController.changePassword);

module.exports = router;
