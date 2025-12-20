
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

// Buyer Product Page: GET single listing details
export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const listingService = (await import("../services/listingService.js")).default;

    const product = await listingService.getListingById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    console.error("Error fetching listing details:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
