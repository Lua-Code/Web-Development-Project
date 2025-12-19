// models/Settings.js
const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  privacy: {
    profileVisibility: {
      type: String,
      enum: ["public", "private"],
      default: "public"
    }
  },
  security: {
    twoFactorAuth: {
      type: Boolean,
      default: false
    }
  },
  notifications: {
    emailAlerts: {
      type: Boolean,
      default: true
    },
    payments: {
      type: Boolean,
      default: true
    }
  }
});

module.exports = mongoose.model("Settings", SettingsSchema);
