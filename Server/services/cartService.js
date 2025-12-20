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
