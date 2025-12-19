import Listing from "../models/Listing.js";

const getListingStats = async (sellerId) => {
    const totalLisings = await Listing.countDocuments({ sellerId });
    const activeListings = await Listing.countDocuments({ sellerId, status: "active" });

    return {
        totalLisings,
        activeListings,
        TotalViews:0,
        avgViewsPerListing:0
    };
}


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

//export default { getListingStats };
export default { getListingStats, getBrowseListings };
