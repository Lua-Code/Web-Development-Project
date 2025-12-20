import Transaction from "../models/Transaction.js";
import categoryService from "./categoryService.js";

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
    tx.orderId.items.forEach((item) => {
      const catId = item.listingId.categoryId.toString();
      if (!revenueMap[catId]) revenueMap[catId] = 0;
      revenueMap[catId] += item.price * item.quantity;
    });
  });

  const revenueByCategory = await Promise.all(
    Object.keys(revenueMap).map(async (catId) => {
      const cat = await categoryService.getCategoryById(catId);
      return {
        category: cat.name,
        revenue: revenueMap[catId],
      };
    })
  );

  return revenueByCategory;
};


export default { getTotalRevenueBySeller, getRevenueByCategoryForSeller };
