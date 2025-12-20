import listingService from "../services/listingService.js";
import sellerService from "../services/sellerService.js";
import Listing from "../models/Listing.js";
import mongoose from "mongoose";

//added //////////////////////////////
// Buyer Browse: GET all active listings for browse page
export const getBrowseListings = async (req, res) => {
  try {
    // import service (ESM default export)
    const listingService = (await import("../services/listingService.js")).default;

    const products = await listingService.getBrowseListings();
    return res.json(products);
  }
  catch (error) {
    console.error("Error fetching browse listings:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getRecentListings = async (req, res) => {
  try {
    const listings = await listingService.getRecentListings();
    return res.json(listings);
  }
  catch (error) {
    console.error("Error fetching recent listings:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getListingCount = async (req, res) => {
  try {
    const count = await listingService.getListingCount();
    return res.json({ totalListings: count });
  }
  catch (error) {
    console.error("Error fetching listing count:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const allListings = await listingService.fetchAll();
    res.status(200).json(allListings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID param:", id);
    console.log("Is valid ObjectId:", mongoose.Types.ObjectId.isValid(id));


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid listing id" });
    }

    const listing = await listingService.fetchListById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const createListing = async (req, res) => {
  try {
    const { title, description, price, stock, images = [], categoryId, condition, status = "Active" } = req.body;
    const userId = req.session.userId;
    const seller = await sellerService.getSellerByUserId(userId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found for user" });
    }
    const sellerId = seller._id;

    if (!title || !description || !price || !stock) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const created = await listingService.createNewListing({
      sellerId,
      title,
      description,
      price,
      stock,
      images,
      categoryId,
      condition,
      status,
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("createListing error:", err);
    res.status(400).json({ message: "Create listing failed", error: err.message });
  }
};


export const updateListing = async (req, res) => {
  try {
    const id = req.params.id?.trim();
    const userId = req.session.userId;

    if (!userId) return res.status(401).json({ message: "Not authenticated" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid listing id" });
    }

    const seller = await sellerService.getSellerByUserId(userId);
    if (!seller) return res.status(404).json({ message: "Seller not found for user" });

    const updated = await Listing.findOneAndUpdate(
      { _id: id, sellerId: seller._id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Listing not found or not owned by you" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update listing error:", err);
    res.status(400).json({ message: "Update listing failed", error: err.message });
  }
};


export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.userId; 

    if (!userId) return res.status(401).json({ message: "Not authenticated" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid listing id" });
    }

    const seller = await sellerService.getSellerByUserId(userId);
    if (!seller) return res.status(404).json({ message: "Seller not found for user" });

    const deleted = await Listing.findOneAndDelete({ _id: id, sellerId: seller._id });
    if (!deleted) return res.status(404).json({ message: "Listing not found or not owned by you" });

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Delete listing error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getMyListings = async (req, res) => {
  try {
    const userId = req.session.userId;
    const seller = await sellerService.getSellerByUserId(userId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found for user" });
    }
    const listings = await listingService.getListingsBySellerId(seller._id);
    return res.json(listings);
  } catch (error) {
    console.error("Error fetching my listings:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

