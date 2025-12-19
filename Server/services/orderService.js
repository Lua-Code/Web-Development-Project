import Order from "../models/Order.js";

const getOrderStatsBySeller = async (sellerId) => {

  const totalOrders = await Order.countDocuments({ sellerId });
  const orders = await Order.find({ sellerId });
  
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return {
    totalOrders,
    averageOrderValue,
  };
};

export default { getOrderStatsBySeller };
