import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },

  amount: { type: Number, required: true },

  currency: { type: String, default: "USD" },

  // only cash or credit-card
  method: {
    type: String,
    enum: ["cash", "credit-card"],
    required: true,
  },

  status: { type: String, default: "completed" },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", TransactionSchema);
