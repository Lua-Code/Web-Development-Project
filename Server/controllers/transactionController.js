import transactionService from "../services/transactionService.js";

const checkout = async (req, res) => {
  try {
    const buyerId = req.session.userId;
    const result = await transactionService.checkoutFromCart(buyerId, req.body);
    return res.status(201).json({ message: "Checkout successful!", ...result });
  } catch (err) {
    return res.status(400).json({ message: err.message || "Checkout failed" });
  }
};

export { checkout };
