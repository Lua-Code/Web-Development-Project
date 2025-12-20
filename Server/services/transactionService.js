import Transaction from "../models/Transaction.js";
import categoryService from "./categoryService.js";

import Cart from "../models/Cart.js";
import Listing from "../models/Listing.js";
import Order from "../models/Order.js";

const getTotalRevenueBySeller = async (sellerId) => {
  const result = await Transaction.aggregate([
    { $match: { sellerId, status: "completed" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  return result[0]?.total || 0;
};

const getRevenueByCategoryForSeller = async (sellerId) => {
  const transactions = await Transaction.find({ sellerId, status: "completed" }).populate({
    path: "orderId",
    populate: { path: "items.listingId", select: "categoryId" },
  });

  const revenueMap = {};

  transactions.forEach((tx) => {
    if (!tx.orderId) return;
    tx.orderId.items.forEach((item) => {
      if (!item.listingId || !item.listingId.categoryId) return;
      const catId = item.listingId.categoryId.toString();
      if (!revenueMap[catId]) revenueMap[catId] = 0;
      revenueMap[catId] += item.price * item.quantity;
    });
  });

  const revenueByCategory = await Promise.all(
    Object.keys(revenueMap).map(async (catId) => {
      const cat = await categoryService.getCategoryById(catId);
      return {
        category: cat?.name || "Unknown",
        revenue: revenueMap[catId],
      };
    })
  );

  return revenueByCategory;
};

/**
 * Checkout from DB cart:
 * - create order(s) (1 per seller)
 * - create transaction(s)
 * - decrement stock
 * - clear cart
 */
const checkoutFromCart = async (buyerId, paymentData = {}) => {
  if (!buyerId) throw new Error("buyerId is required");

  const {
    address = "",
    paymentMethod = "card",
    cardHolderName = "",
    cardNumber = ""
  } = paymentData;

  const cart = await Cart.findOne({ userId: buyerId }).populate({
    path: "items.listingId",
    select: "sellerId title price stock status"
  });

  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    throw new Error("Your cart is empty.");
  }

  // group by seller
  const groups = {}; // sellerId => { items: [], total: 0 }

  for (const item of cart.items) {
    const listing = item.listingId;
    if (!listing) throw new Error("A product in your cart no longer exists.");

    const sellerId = listing.sellerId?.toString();
    if (!sellerId) throw new Error("Seller not found for a cart item.");

    const qty = Number(item.quantity) || 1;

    if ((listing.stock ?? 0) < qty) {
      throw new Error(`Not enough stock for: ${item.title || listing.title}`);
    }

    if (!groups[sellerId]) groups[sellerId] = { items: [], total: 0 };

    const price = Number(item.price ?? listing.price) || 0;

    groups[sellerId].items.push({
      listingId: listing._id,
      title: item.title || listing.title,
      price,
      quantity: qty
    });

    groups[sellerId].total += price * qty;
  }

  // decrement stock
  for (const sellerId of Object.keys(groups)) {
    for (const it of groups[sellerId].items) {
      const listing = await Listing.findById(it.listingId).select("stock status title");
      if (!listing) throw new Error("Listing not found during checkout.");

      if ((listing.stock ?? 0) < it.quantity) {
        throw new Error(`Stock changed for ${listing.title}. Please refresh and try again.`);
      }

      listing.stock = (listing.stock ?? 0) - it.quantity;

      if (listing.stock <= 0) {
        listing.stock = 0;
        listing.status = "Sold";
      }

      await listing.save();
    }
  }

  // create orders + transactions
  const createdOrders = [];
  const createdTransactions = [];

  for (const sellerId of Object.keys(groups)) {
    const order = await Order.create({
      buyerId,
      sellerId,
      items: groups[sellerId].items,
      total: groups[sellerId].total,
      status: "pending"
    });

    const tx = await Transaction.create({
      orderId: order._id,
      buyerId,
      sellerId,
      type: "payment",
      status: "completed",
      amount: order.total,
      paymentMethod,
      cardHolderName,
      cardLast4: String(cardNumber).slice(-4),
      address
    });

    createdOrders.push(order);
    createdTransactions.push(tx);
  }

  // clear cart
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return {
    orders: createdOrders.map(o => ({ id: o._id, sellerId: o.sellerId, total: o.total })),
    transactions: createdTransactions.map(t => ({ id: t._id, amount: t.amount }))
  };
};

export default {
  getTotalRevenueBySeller,
  getRevenueByCategoryForSeller,
  checkoutFromCart
};
