import Transaction from "../models/Transaction.js";
import Order from "../models/Order.js";

const getTransactionStatsBySeller = async (sellerId) => {
  const response = await Transaction.aggregate([
    { $match: { sellerId: mongoose.Types.ObjectId(sellerId), status: "completed" } },
    {$group: { _id : null, totalAmount: { $sum: "$amount" } } },
  ]);
  return response[0]?.amount || 0;
};


const getTotalRevenueByCategory = async (sellerId) => {
    return await Order.aggregate([
        { $match: { sellerId: mongoose.Types.ObjectId(sellerId), status: "Completed" } },
        {$unwind: "$items" },
        { $lookup: {
                from: "listings",
                localField: "items.listingId",
                foreignField: "_id",
                as: "listingDetails"
            }
        },
        { $group : {
            _id: "$listingDetails.categoryId",
            revenue : {sum : {$multiply: ["$items.price", "$items.quantity"]}}

        }},
        {$lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {$unwind: "$categoryDetails"},
        { $project: {
                _id: 0,
                category: "$categorydetails.name",
                revenue: 1
            }
        }
    ]);
};
export default { getTransactionStatsBySeller, getTotalRevenueByCategory };