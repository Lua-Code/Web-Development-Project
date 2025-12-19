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

export default { getOrderStatsBySeller, getOrdersForBuyer, createOrderForBuyer };
