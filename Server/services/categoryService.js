import Category from "../models/Category.js";

const getCategoryById = async (categoryId) => {
    const category = await Category.findById(categoryId);
    return category;
}   

const getAllCategories = async () => {
    const categories = await Category.find();
    return categories;
}


export default { getCategoryById, getAllCategories };