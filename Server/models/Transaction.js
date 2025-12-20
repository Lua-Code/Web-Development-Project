import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },

  type: { type: String, default: "payment" }, // payment, refund
  status: { type: String, default: "completed" }, // completed, failed
  amount: { type: Number, required: true },

  // payment details (simple for college project)
  paymentMethod: { type: String, default: "card" },
  cardHolderName: { type: String, default: "" },
  cardLast4: { type: String, default: "" },
  address: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Transaction", TransactionSchema);
