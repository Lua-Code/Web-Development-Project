import orderService from "../services/orderService.js";
import transactionService from "../services/transactionService.js";
import listingService from "../services/listingService.js";
import sellerService from "../services/sellerService.js";
import reviewService from "../services/reviewService.js"; 


const getSellerAnalytics = async (req, res) => {
  try {
    const userId = req.session.userId;
    const seller = await sellerService.getSellerByUserId(userId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const sellerId = seller._id;
    
    const [orderStats,totalRevenue,listingStats,revenueByCategory] = await Promise.all([
      orderService.getOrderStatsBySeller(sellerId),
      transactionService.getTotalRevenueBySeller(sellerId),
      listingService.getListingsStatsBySeller(sellerId),
      transactionService.getRevenueByCategoryForSeller(sellerId)
    ]);
    res.json({
        sales: {
            totalOrders: orderStats.totalOrders,
            totalRevenue,
            averageOrderValue: orderStats.averageOrderValue,
        },
        listings: {
          totalListings: listingStats.totalListings,
          activeListings: listingStats.activeListings,
          totalViews: listingStats.totalViews,
          avgViewsPerListing: listingStats.avgViewsPerListing,

        },
        revenueByCategory
    });
  } 
  catch (error) {
    console.error("Error fetching seller analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSellerDashboard = async (req, res) => {
  try {

    const seller = await sellerService.getSellerByUserId(req.session.userId);
    if (!seller) {
      return res.status(403).json({ message: "Seller profile not found" });
    }

    const sellerId = seller._id;

    const [
      activeListings,
      totalRevenue,
      pendingOrders,
      recentOrders,
      topProducts,
      avgRating
    ] = await Promise.all([
      listingService.getActiveListingsCountBySeller(sellerId),
      transactionService.getTotalRevenueBySeller(sellerId),
      orderService.getPendingOrderCountBySeller(sellerId),
      orderService.getRecentOrdersBySeller(sellerId),
      orderService.getTopSellingProductsBySeller(sellerId),
      reviewService.getAverageRatingBySeller(sellerId),
    ]);

    res.json({
      stats: {
        activeListings,
        totalRevenue,
        pendingOrders,
        avgRating,
        growth: "23", 
        totalViews: 21
      },
      recentOrders,
      topProducts
    });
  } catch (error) {
    console.error("Seller dashboard error:", error);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};

const getCurrentSellerProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const seller = await sellerService.getSellerByUserId(userId);
    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }
    res.json(seller);
  } catch (error) {
    console.error("Error fetching seller profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateSellerProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const updatedSeller = await sellerService.updateSellerByUserId(userId, req.body);

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json(updatedSeller);
  } catch (error) {
    console.error("Error updating seller profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createShop = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const { shopName, shopDescription } = req.body;
    console.log("Creating shop with data:", req.body);
    if (!shopName || !shopDescription) {
      return res.status(400).json({ message: "Shop name and description are required" });
    }

    const newSeller = await sellerService.createSellerProfile(userId, shopName, shopDescription);
    res.status(201).json(newSeller);
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSellerCount = async (req, res) => {
  try {
    const count = await sellerService.getSellerCount();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching seller count:", error);
    res.status(500).json({ message: "Server error" });
  } 
};

export { getSellerAnalytics, getSellerDashboard, getCurrentSellerProfile, updateSellerProfile, createShop, getSellerCount };