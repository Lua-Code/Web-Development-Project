import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Get user by ID
const getUserById = async (userId) => {
  return await User.findById(userId).select("-password");
};

// Get current logged-in user by session/userId
const getCurrentUser = async (userId) => {
  return await User.findById(userId).select("-password");
};

// Get all users
const getUsers = async () => {
  return await User.find().select("-password");
};

// Create a new user
const createUser = async ({ username, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email, password: hashedPassword });
  const u = user.toObject();
  delete u.password;
  return u;
};

// Update user safely (handles nested profile)
const updateUser = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // remove password field if sent
  delete updates.password;

  // handle nested profile
  if (updates.profile && typeof updates.profile === "object") {
    Object.keys(updates.profile).forEach((key) => {
      user.profile[key] = updates.profile[key];
    });
    user.markModified("profile");
  }

  // handle top-level updates
  Object.keys(updates).forEach((key) => {
    if (key !== "profile") {
      user[key] = updates[key];
      if (Array.isArray(user[key])) user.markModified(key);
    }
  });

  await user.save();



  const u = user.toObject();
  delete u.password;
  return u;
};



// Delete a user
const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");
  return true;
};

export default {
  getUserById,
  getCurrentUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
};




