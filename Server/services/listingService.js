import Listing from "../models/Listing.js";
import mongoose from "mongoose";

const getListingsStatsBySeller = async (sellerId) => {
  const listings = await Listing.find({ sellerId });

  return {
    totalListings: listings.length,
    activeListings: listings.filter((l) => l.status === "Active").length,
  };
};

const getActiveListingsCountBySeller = async (sellerId) => {
  const activeListingsCount = await Listing.countDocuments({ sellerId, status: "Active" });
  return activeListingsCount;
};



//added//////////////////////////////////
// Buyer Browse: get public listings for the browse page
const getBrowseListings = async () => {
  // Your DB dump uses "Active", your code uses "active" → support both
  const statusFilter = { $in: ["active", "Active"] };

  const listings = await Listing.find({
    status: statusFilter,
    stock: { $gt: 0 }
  })
    .sort({ createdAt: -1 })
    .populate("sellerId", "storeName ratings.average");

  return listings.map((l) => ({
    id: l._id,
    name: l.title,
    image: Array.isArray(l.images) && l.images.length ? l.images[0] : "",
    price: l.price,
    seller: l.sellerId?.storeName || "Unknown",
    rating: l.sellerId?.ratings?.average ?? 0
  }));
};

const getRecentListings = async () => {
  const listings = await Listing.find({
    status: { $in: ["active", "Active"] },
    stock: { $gt: 0 }
  })
    .sort({ createdAt: -1 })
    .limit(8)
    .populate("sellerId", "storeName ratings.average");

  return listings.map((l) => ({
    id: l._id,
    name: l.title,
    image: Array.isArray(l.images) && l.images.length ? l.images[0] : "",
    price: l.price,
    seller: {
      name: l.sellerId?.storeName || "Unknown",
      rating: l.sellerId?.ratings?.average ?? 0
    },
  }));

};

const getListingCount = async () => {
  const count = await Listing.countDocuments({
    status: { $in: ["active", "Active"] },
  });
  return count;
};

const fetchAll=async(req,res)=>{
  try{const allListings=await Listing.find();
    console.log("✅ Listing collection:", Listing.collection.name);

  return allListings}
  catch(err){
    throw new Error("Error fetching listings"+err.message);
  }
};

const fetchListById = async (id) => {
  try {
    const listing = await Listing.findById(id); 
    return listing;
  } catch (err) {
    throw new Error("Error fetching listing: " + err.message);
  }
};

const createNewListing = async (listingData) => {
  try {
    console.log("Creating listing with data:", listingData);
    const newListing = new Listing(listingData); 
    await newListing.save(); 
    return newListing;
  } catch (err) {
    throw new Error("Error creating listing: " + err.message);
  }
};

const updateListing = async (id, updatedData) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, { new: true }); 
    return updatedListing;
  } catch (err) {
    throw new Error("Error updating listing: " + err.message);
  }
};

const deleteListing = async (id, sellerId) => {
  try {
    return await Listing.findOneAndDelete({ _id: id, sellerId });
  } catch (err) {
    throw new Error("Error deleting listing: " + err.message);
  }
};


const getListingsBySellerId = async (sellerId) => {
  try {
    const listings = await Listing.find({ sellerId });
    return listings;
  } catch (err) {
    throw new Error("Error fetching listings by seller: " + err.message);
  }
};


//export default { getListingStats };
export default { getListingsStatsBySeller, getBrowseListings, getActiveListingsCountBySeller, getRecentListings, getListingCount, fetchAll, fetchListById, createNewListing, updateListing, deleteListing, getListingsBySellerId };
