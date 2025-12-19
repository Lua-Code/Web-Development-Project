import Order from "../models/Order.js";

const getOrderStatsBySeller = async (sellerId) => {
  const orders = await Order.find({ sellerId, status: "Completed" });

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  return {
    totalOrders,
    averageOrderValue,
    conversionRate: 0};
}

export default { getOrderStatsBySeller };