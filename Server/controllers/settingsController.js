import Settings from "../models/Settings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// GET settings
export const getSettings = async (req, res) => {
  const settings = await Settings.findOne({ userId: req.userId });
  res.json(settings);
};

// UPDATE privacy
export const updatePrivacy = async (req, res) => {
  const { profileVisibility } = req.body;

  const updated = await Settings.findOneAndUpdate(
    { userId: req.userId },
    { "privacy.profileVisibility": profileVisibility },
    { new: true, upsert: true }
  );

  res.json(updated);
};

// UPDATE notifications
export const updateNotifications = async (req, res) => {
  const { emailAlerts, payments } = req.body;

  const updated = await Settings.findOneAndUpdate(
    { userId: req.userId },
    {
      "notifications.emailAlerts": emailAlerts,
      "notifications.payments": payments
    },
    { new: true }
  );

  res.json(updated);
};

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.userId);
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
};
