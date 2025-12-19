import Review from "../models/Review.js";

const getAverageRatingBySeller = async (sellerId) => {
  const result = await Review.aggregate([
    { $match: { sellerId } },
    { $group: { _id: null, avg: { $avg: "$rating" } } }
  ]);

  return result[0]?.avg?.toFixed(1) || "0.0";
};

export default { getAverageRatingBySeller };
