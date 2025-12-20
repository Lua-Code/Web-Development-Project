import * as cartService from "../services/cartService.js";

export const addToCart = async (req, res) => {
  try {
    console.log("Add to cart request body and userId:", req.body, req.session.userId);
    const { productId, quantity } = req.body;
    const userId = req.session.userId;
    console.log("Adding to cart - userId:", userId, "productId:", productId, "quantity:", quantity);

    const cart = await cartService.addToCart(userId, productId, quantity);
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
