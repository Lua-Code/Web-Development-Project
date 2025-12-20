// models/Settings.js
import mongoose from "mongoose";

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

export default mongoose.model("Settings", SettingsSchema);
