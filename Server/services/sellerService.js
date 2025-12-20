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

const createSellerProfile = async (userId, storeName, storeDescription) => {
  if (!storeName) throw new Error("Store name is required");
  const existing = await Seller.findOne({ userId });
  if (existing) throw new Error("Seller profile already exists"); 
  const seller = await Seller.create({ userId, storeName, storeDescription });
  return seller;
};


export default { updateSellerByUserId,getSellerByUserId, createSellerProfile };
