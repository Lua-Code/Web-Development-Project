import Seller from "../models/Seller.js";
import mongoose from "mongoose";

const getSellerByUserId = async (userId) => {
  return await Seller.findOne({ userId });
};

const updateSellerByUserId = async (userId, updates) => {
  const seller = await Seller.findOneAndUpdate(
    { userId },
    updates,
    { new: true }
  );
  return seller;
};

export default { updateSellerByUserId,getSellerByUserId };
