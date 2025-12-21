import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function RecentListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = async (listingId, quantity = 1) => {
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: listingId, quantity }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to add to cart");
      }

      alert("Added to cart!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/listings/recent`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch Listings");
        const data = await res.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-16">Loading recent listings...</p>;
  if (error) return <p className="text-center py-16 text-red-500">{error}</p>;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-[#1d3557] mb-2 text-2xl font-bold">Recent Listings</h2>
            <p className="text-[#457b9d]">Fresh items from our sellers</p>
          </div>
          <Link
            to="/marketplace"
            className="border border-[#457b9d] text-[#457b9d] px-4 py-2 rounded hover:bg-[#457b9d] hover:text-white cursor-pointer transition"
          >
            Browse All Items
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((product) => (
            <div key={product.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-[#1d3557] font-semibold">{product.name}</h3>
                <p className="text-[#457b9d] text-sm">{product.condition || "N/A"}</p>
                <p className="text-[#e63946] font-bold mt-1">${product.price.toFixed(2)}</p>
                <p className="text-[#457b9d] text-xs mt-2">
                  Seller: {product.seller.name} ({product.seller.rating}⭐)
                </p>

                <button
                  onClick={() => addToCart(product.id)}
                  className="mt-4 w-full bg-[#457b9d] text-white py-2 rounded hover:bg-[#1d3557] cursor-pointer transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
