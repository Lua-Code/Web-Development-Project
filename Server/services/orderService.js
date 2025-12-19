import Order from "../models/Order.js";
import userService from "../services/userService.js";

const getOrderStatsBySeller = async (sellerId) => {
  const completedOrders = await Order.find({
    sellerId

  });

  const totalOrders = completedOrders.length;

  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + o.total,
    0
  );

  const averageOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
  };
};

const getPendingOrderCountBySeller = async (sellerId) => {
  return await Order.countDocuments({
    sellerId,
    status: "pending",
  });
};

const getRecentOrdersBySeller = async (sellerId, limit = 5) => {
  const orders = await Order.find({ sellerId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("buyerId", "username")
    .populate("items.listingId", "title price");

  return orders.map(order => ({
    id: order._id,
    buyer: userService.getUserProfile(order.buyerId)?.username || "Unknown",
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
    items: order.items.map(i => ({
      title: i.listingId?.title,
      quantity: i.quantity,
      price: i.price,
    })),
  }));
};

const getTopSellingProductsBySeller = async (sellerId) => {
  const orders = await Order.find({
    sellerId,
    status: "completed",
  }).populate("items.listingId", "title price");

  const productMap = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      if (!item.listingId) return;

      const id = item.listingId._id.toString();

      if (!productMap[id]) {
        productMap[id] = {
          title: item.listingId.title,
          price: item.price,
          sales: 0,
        };
      }

      productMap[id].sales += item.quantity;
    });
  });

  return Object.values(productMap)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);
};

export default {
  getOrderStatsBySeller,
  getPendingOrderCountBySeller,
  getRecentOrdersBySeller,
  getTopSellingProductsBySeller,
};
