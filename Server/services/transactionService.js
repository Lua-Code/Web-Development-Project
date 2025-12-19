import Transaction from "../models/Transaction.js";

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
  console.log("Transactions:", JSON.stringify(transactions, null, 2));

  const revenueMap = {};

  transactions.forEach((tx) => {
    tx.orderId.items.forEach((item) => {
      const catId = item.listingId.categoryId.toString();
      if (!revenueMap[catId]) revenueMap[catId] = 0;
      revenueMap[catId] += item.price * item.quantity;
    });
  });

  const revenueByCategory = Object.keys(revenueMap).map((catId) => ({
    category: catId, 
    revenue: revenueMap[catId],
  }));

  return revenueByCategory;
};

export default { getTotalRevenueBySeller, getRevenueByCategoryForSeller };
