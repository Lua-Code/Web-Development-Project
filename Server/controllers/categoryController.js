import Category from "../models/Category.js";
import categoryService from "../services/categoryService.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.fetchAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export { getAllCategories };
