import orderService from "../services/orderService.js";
import sellerService from "../services/sellerService.js";

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

const getOrders = async (req, res) => {
  try {
    const allOrders = await orderService.fetchAllOrders(req.query);
    res.status(200).json(allOrders);
  } catch (err) {
    res.status(500).json({ message: "error in getting orders", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ message: "status is required" });

    const updated = await orderService.updateStatus(id, status);
    if (!updated) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "error in updating order", error: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderById = await orderService.fetchOrderById(id);
    if (!orderById) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(orderById);
  } catch (err) {
    res.status(500).json({ message: "Error in getting this order", error: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const createdOrder = await orderService.createNewOrder(req.body);
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(400).json({ message: "can't create order", error: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await orderService.updateOrderById(id, req.body);
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: "can't update order", error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await orderService.deleteOrderById(id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "can't delete this order", error: err.message });
  }
};

const getOrdersSeller = async (req, res) => {
  try {
    const userId = req.session.userId;
    const seller = await sellerService.getSellerByUserId(userId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found for user" });
    }
    const orders = await orderService.getOrdersForSeller(seller._id);
    return res.json(orders);
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export { getMyOrders, createMyOrder, getOrders, getOrderById, createOrder, updateOrder, deleteOrder, updateOrderStatus, getOrdersSeller };
