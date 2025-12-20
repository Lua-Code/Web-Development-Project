import Cart from "../models/Cart.js";
import Listing from "../models/Listing.js";

export const addToCart = async (userId, listingId, quantity = 1) => {
  if (!userId || !listingId) {
    throw new Error("userId and listingId are required");
  }

  const listing = await Listing.findById(listingId);
  if (!listing) throw new Error("Listing not found");

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(
    item => item.listingId.toString() === listingId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      listingId,
      title: listing.title,
      price: listing.price,
      quantity,
    });
  }

  await cart.save();
  return cart;
};

// Get current user's cart items formatted for the buyer app
// Output: [{ id, name, image, price, quantity }]
export const getCartItems = async (userId) => {
  if (!userId) throw new Error("userId is required");

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.listingId",
    select: "title images",
  });

  if (!cart) return [];

  return cart.items.map((item) => {
    const listing = item.listingId;
    const image = listing?.images?.length ? listing.images[0] : "";
    return {
      id: item.listingId?._id || item.listingId,
      name: item.title || listing?.title || "",
      image,
      price: item.price,
      quantity: item.quantity,
    };
  });
};

export const removeFromCart = async (userId, listingId) => {
  if (!userId || !listingId) {
    throw new Error("userId and listingId are required");
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  cart.items = cart.items.filter(
    item => item.listingId.toString() !== listingId
  );

  await cart.save();
  return cart;
};
