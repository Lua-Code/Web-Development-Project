 import User from "../models/User.js";
 import Seller from "../models/Seller.js"; 
import bcrypt from "bcryptjs";

export const loginBuyer = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Buyer Account Doesn't Exist, Please Register first." });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid Email or Password" });

  req.session.userId = user._id;

  res.json({ message: "Logged in", email: user.email });
};

export const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Please create a buyer account first" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid email or password" });

  const sellerProfile = await Seller.findOne({ userId: user._id });
  if (!sellerProfile) return res.status(403).json({ message: "Please register as a seller first" });

  req.session.userId = user._id;
  res.json({ message: "Logged in as seller", sellerProfile });
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
