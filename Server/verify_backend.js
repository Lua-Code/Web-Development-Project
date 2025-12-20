
const verify = async () => {
    try {
        console.log("Fetching all listings...");
        const listRes = await fetch("http://localhost:5000/api/listings");
        if (!listRes.ok) throw new Error("Failed to fetch list");
        const list = await listRes.json();

        if (list.length === 0) {
            console.log("No listings found to test.");
            return;
        }

        const id = list[0].id;
        console.log(`Found ID: ${id}. Fetching details...`);

        const detailRes = await fetch(`http://localhost:5000/api/listings/${id}`); // Note: logic in Service uses _id but returns id in transform
        // Wait, the service returns `id` in map, but `getListingById` returns `id`.
        // Let's check if the list endpoint returns `id` or `_id`. 
        // The service `getBrowseListings` returns mapped object with `id`.

        if (!detailRes.ok) {
            console.log("Detail fetch failed status:", detailRes.status);
            const text = await detailRes.text();
            console.log("Response:", text);
            throw new Error("Failed to fetch detail");
        }

        const detail = await detailRes.json();
        console.log("✅ Verification Successful!");
        console.log("Product Title:", detail.title);
        console.log("Product Price:", detail.price);
    } catch (err) {
        console.error("Verification failed:", err);
        process.exit(1);
    }
};

verify();
