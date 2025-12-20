import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const Hero = () => {
  const [activeSellers, setActiveSellers] = useState(0);
  const [itemsListed, setItemsListed] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [sellersRes, listingsRes] = await Promise.all([
          fetch("http://localhost:5000/api/seller/count", { credentials: "include" }),
          fetch("http://localhost:5000/api/listings/count", { credentials: "include" }),
        ]);

        const sellersData = await sellersRes.json();
        const listingsData = await listingsRes.json();

        if (sellersRes.ok) setActiveSellers(sellersData.count);
        if (listingsRes.ok) setItemsListed(listingsData.totalListings);
      } catch (err) {
        console.error("Failed to fetch counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#457b9d] to-[#1d3557] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white mb-6 text-4xl font-bold">
            Buy & Sell from Local Sellers
          </h1>
          <p className="text-[#f1faee] mb-8 opacity-90">
            Connect with trusted sellers in your community. List your items or find unique products.
          </p>

          {/* <div className="flex gap-2 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1d3557] h-5 w-5" />
              <input
                type="text"
                placeholder="Search for items or sellers..."
                className="pl-10 bg-white border-none h-12 w-full rounded-md text-base outline-none"
              />
            </div>
            <button className="bg-[#e63946] hover:bg-[#c62d3a] text-white h-12 px-8 rounded-md cursor-pointer">
              Search
            </button>
          </div> */}

          <div className="mt-8 flex gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[150px]">
              <p className="text-white mb-1">Active Sellers</p>
              <p className="text-[#a8dadc]">{activeSellers}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[150px]">
              <p className="text-white mb-1">Items Listed</p>
              <p className="text-[#a8dadc]">{itemsListed}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
