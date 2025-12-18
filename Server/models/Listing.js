const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [String],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  condition: String, // new, used, refurbished
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status : { type: String, enum: ["active", "inactive", "sold"], default: "active" }
});

module.exports = mongoose.model("Listing", ListingSchema);
