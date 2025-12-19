import orderService from "../services/orderService.js";
import transactionService from "../services/transactionService.js";
import listingService from "../services/listingService.js";
import sellerSerice from "../services/sellerService.js";


const getSellerAnalytics = async (req, res) => {
  try {
    const userId = req.session.userId;
    const seller = await sellerSerice.getSellerByUserId(userId);
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

export { getSellerAnalytics };
