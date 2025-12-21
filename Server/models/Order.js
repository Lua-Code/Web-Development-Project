import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
  title: String,
  price: Number,
  quantity: Number
});

const OrderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  items: [OrderItemSchema],
  total: Number,
  status: { type: String, default: "pending" }, // pending, shipped, delivered
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  Comment: String
});

export default mongoose.model("Order", OrderSchema);
