import listingService from "../services/listingService.js";
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
