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
export default { getListingStats };