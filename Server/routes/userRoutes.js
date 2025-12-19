const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
//const {} = require("../controllers/userController");
router.post("/register", async (req, res) => {
   console.log("REQ BODY =>", req.body);
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || !confirmpassword)
      return res.status(400).json({ message: "All fields required" });

    if (password !== confirmpassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err); // this will show the exact error in terminal
    res.status(500).json({ message: "Server error" });
  }
});


// Export router
module.exports = router;