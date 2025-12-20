
const testImports = async () => {
    try {
        console.log("Importing model...");
        const model = await import("./models/Listing.js");
        console.log("Model loaded");
    } catch (e) {
        console.error("Model failed:", e);
    }

    try {
        console.log("Importing service...");
        const service = await import("./services/listingService.js");
        console.log("Service loaded");
    } catch (e) {
        console.error("Service failed:", e);
    }

    try {
        console.log("Importing controller...");
        const controller = await import("./controllers/listingController.js");
        console.log("Controller loaded");
    } catch (e) {
        console.error("Controller failed:", e);
    }
};

testImports();
