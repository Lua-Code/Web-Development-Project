import * as cartService from "../services/cartService.js";

export const addToCartHandler = async (req, res) => {
  try {
    const userId = req.session.userId; 
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId and quantity are required" });
    }

    const cart = await cartService.addToCart(userId, productId, quantity);
    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCartHandler = async (req, res) => {
  try {
    const userId = req.session.userId;
    const items = await cartService.getCartItems(userId);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCartHandler = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const cart = await cartService.removeFromCart(userId, productId);
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
