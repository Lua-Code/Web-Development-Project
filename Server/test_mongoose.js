
import mongoose from "mongoose";
console.log("Mongoose loaded");
try {
    const Listing = (await import("./models/Listing.js")).default;
    console.log("Listing loaded");
} catch (e) {
    console.error("Listing load failed:", e);
}
