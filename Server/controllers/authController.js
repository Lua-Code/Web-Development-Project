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
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const sellerProfile = await Seller.findOne({ userId: user._id });

  req.session.userId = user._id;

  if (!sellerProfile) {
    return res.status(200).json({
      isSeller: false
    });
  }

  res.json({
    isSeller: true,
    sellerProfile
  });
};



export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      roles: ["buyer"], // default role
      isActive: true,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getCurrentUser = (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });

  res.json({ userId: req.session.userId });
};
