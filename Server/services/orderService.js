// import Order from "../models/Order.js";

// const getOrderStatsBySeller = async (sellerId) => {

//   const totalOrders = await Order.countDocuments({ sellerId });
//   const orders = await Order.find({ sellerId });
  
//   const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
//   const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

//   return {
//     totalOrders,
//     averageOrderValue,
//   };
// };

// export default { getOrderStatsBySeller };


import Order from "../models/Order.js";
import Listing from "../models/Listing.js";
import userService from "../services/userService.js";
import User from "../models/User.js";

export const getOrderStatsBySeller = async (sellerId) => {
  const totalOrders = await Order.countDocuments({ sellerId });
  const orders = await Order.find({ sellerId });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return { totalOrders, averageOrderValue };
};

/* MyOrders - return orders for one buyer */
export const getOrdersForBuyer = async (buyerId) => {
  const orders = await Order.find({ buyerId })
    .sort({ createdAt: -1 })
    .populate("items.listingId", "images")
    .lean();

  return orders.map((o) => {
    const firstItem = o.items?.[0];

    const image =
      firstItem?.listingId?.images?.[0] || "";

    const status =
      o.status
        ? o.status.charAt(0).toUpperCase() + o.status.slice(1)
        : "Pending";

    return {
      id: o._id,
      image,
      productName: firstItem?.title || "Order",
      date: new Date(o.createdAt).toLocaleDateString(),
      price: o.total ?? 0,
      status
    };
  });
};

/* Create order for logged-in buyer (Checkout POST /orders) */
const createOrderForBuyer = async (buyerId, payload) => {
  const { items, total } = payload || {};

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No items in order.");
  }

  // Determine listingId from first item
  const first = items[0];
  const rawListingId = first.listingId || first._id || first.id;

  // If listing id is missing, we can still create an order but sellerId is required by schema.
  // So we must find the listing to get sellerId.
  const listing = await Listing.findById(rawListingId).select("sellerId title price");
  if (!listing) {
    throw new Error("Listing not found. Cart items must include listing id.");
  }

  const order = await Order.create({
    buyerId,
    sellerId: listing.sellerId,
    items: items.map((it) => ({
      listingId: it.listingId || it._id || it.id,
      title: it.title || it.name || "Item",
      price: it.price ?? 0,
      quantity: it.quantity ?? 1
    })),
    total: total ?? 0,
    status: "pending"
  });

  return order;
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
    .populate("items.listingId", "title price");

  const result = await Promise.all(
    orders.map(async (order) => {
      const buyerId = order.buyerId._id || order.buyerId;
      const buyer = await User.findById(buyerId).select("username");

      return {
        id: order._id,
        buyer: buyer?.username || "Unknown",
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items.map((i) => ({
          title: i.listingId?.title,
          quantity: i.quantity,
          price: i.price,
        })),
      };
    })
  );

  return result;
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

const fetchAllOrders = async (query = {}) => {
  const filter = {};
  if (query.sellerId) filter.sellerId = query.sellerId;
  if (query.buyerId) filter.buyerId = query.buyerId;
  if (query.status) filter.status = query.status;

  return Order.find(filter).sort({ createdAt: -1 });
};

const fetchOrderById = async (id) => {
  return Order.findById(id);
};

const createNewOrder = async (data) => {
  if (!data || !data.buyerId || !data.sellerId) {
    throw new Error("buyerId and sellerId are required");
  }

  const items = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0) {
    throw new Error("items are required");
  }

  const total = items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const orderData = {
    buyerId: data.buyerId,
    sellerId: data.sellerId,
    items: items.map((i) => ({
      listingId: i.listingId,
      title: i.title,
      price: Number(i.price) || 0,
      quantity: Number(i.quantity) || 0,
    })),
    total,
    status: data.status || "pending",
  };

  return Order.create(orderData);
};

const updateOrderById = async (id, data) => {
  if (!data) data = {};

  const update = { ...data };

  if (Array.isArray(update.items)) {
    const total = update.items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    update.total = total;
  }

  return Order.findByIdAndUpdate(id, update, { new: true, runValidators: true });
};

const updateStatus = async (id, status) => {
  const allowed = ["pending", "shipped", "delivered"];
  const next = String(status || "").toLowerCase();
  if (!allowed.includes(next)) {
    throw new Error("invalid status");
  }
  return Order.findByIdAndUpdate(id, { status: next }, { new: true, runValidators: true });
};

const deleteOrderById = async (id) => {
  return Order.findByIdAndDelete(id);
};

const getOrdersForSeller = async (sellerId) => {
  try {
    const orders = await Order.find({ sellerId })
      .sort({ createdAt: -1 })
      .populate("items.listingId", "images")
      .lean();
    return orders;
  } catch (err) {
    throw new Error("Error fetching orders for seller: " + err.message);
  }
};


export default {
  getOrderStatsBySeller, getOrdersForBuyer, createOrderForBuyer,
  getPendingOrderCountBySeller,
  getRecentOrdersBySeller,
  getTopSellingProductsBySeller,
  fetchAllOrders,
  fetchOrderById,
  createNewOrder,
  updateOrderById,
  updateStatus,
  deleteOrderById,
  getOrdersForSeller
};
