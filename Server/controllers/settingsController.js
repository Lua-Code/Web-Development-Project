const Settings = require("../models/Settings");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET settings
exports.getSettings = async (req, res) => {
  const settings = await Settings.findOne({ userId: req.user.id });
  res.json(settings);
};

// UPDATE privacy
exports.updatePrivacy = async (req, res) => {
  const { profileVisibility } = req.body;

  const updated = await Settings.findOneAndUpdate(
    { userId: req.user.id },
    { "privacy.profileVisibility": profileVisibility },
    { new: true, upsert: true }
  );

  res.json(updated);
};

// UPDATE notifications
exports.updateNotifications = async (req, res) => {
  const { emailAlerts, payments } = req.body;

  const updated = await Settings.findOneAndUpdate(
    { userId: req.user.id },
    {
      "notifications.emailAlerts": emailAlerts,
      "notifications.payments": payments
    },
    { new: true }
  );

  res.json(updated);
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
};
