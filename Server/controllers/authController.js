 import User from "../models/User.js"; // your user model
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  req.session.userId = user._id;

  res.json({ message: "Logged in", username: user.username });
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
};

export const getCurrentUser = (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });

  res.json({ userId: req.session.userId });
};
