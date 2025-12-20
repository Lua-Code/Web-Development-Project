import Category from "../models/Category.js";

const getCategoryById = async (categoryId) => {
    const category = await Category.findById(categoryId);
    return category;
}   

const fetchAllCategories = async () => {
    const categories = await Category.find();
    return categories;
}


export default { getCategoryById, fetchAllCategories };