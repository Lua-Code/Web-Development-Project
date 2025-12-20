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
