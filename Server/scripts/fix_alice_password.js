import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const MONGO_URI = "mongodb+srv://kevin_david:russianbias@meowcluster.zlqmwpu.mongodb.net/marketplaceDB?retryWrites=true&w=majority";

const fixAlice = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");

        const email = "alice123@gmail.com";
        const newPassword = "alice123";

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found!");
            process.exit(1);
        }

        console.log("Found user:", user.username);
        console.log("Current password stored:", user.password);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        console.log("✅ Password successfully updated to hashed 'alice123'");

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
};

fixAlice();
