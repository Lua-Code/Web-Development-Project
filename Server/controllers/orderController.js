import orderService from "../services/orderService.js";

/** GET /orders and GET /api/orders -> My Orders (for logged-in buyer) */
const getMyOrders = async (req, res) => {
  try {
    const buyerId = req.session.userId; // set by buyer-login
    const orders = await orderService.getOrdersForBuyer(buyerId);
    return res.json(orders);
  } catch (error) {
    console.error("getMyOrders error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** POST /orders and POST /api/orders -> create order (Checkout) */
const createMyOrder = async (req, res) => {
  try {
    const buyerId = req.session.userId;
    const order = await orderService.createOrderForBuyer(buyerId, req.body);
    return res.status(201).json({ id: order._id });
  } catch (error) {
    console.error("createMyOrder error:", error);
    return res.status(400).json({ message: error.message || "Order failed" });
  }
};

export { getMyOrders, createMyOrder };
