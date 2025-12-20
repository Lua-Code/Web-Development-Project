import Category from "../models/Category.js";

const getCategoryById = async (categoryId) => {
    const category = await Category.findById(categoryId);
    return category;
}   


export default { getCategoryById };