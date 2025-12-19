import orderService from "../services/orderService.js";
import transactionService from "../services/transactionService.js";
import listingService from "../services/listingService.js";


const getSellerAnalytics = async (req, res) => {
  try {
    const sellerId = req.session.userId;
    
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
            conversionRate: orderStats.conversionRate
        },
        listings: listingStats,
        revenueByCategory
    });
  } 
  catch (error) {
    console.error("Error fetching seller analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getSellerAnalytics };
