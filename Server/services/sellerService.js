import Seller from "../models/Seller.js";

const getSellerByUserId = async (userId) => {
  return await Seller.findOne({ userId });
};

export default { getSellerByUserId };
