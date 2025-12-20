import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, ArrowLeft } from "lucide-react";

const CreateShopPage = () => {
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCreateShop = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/seller/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ shopName, shopDescription }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create shop");

      console.log("Shop created:", data);
      navigate("/seller/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full">
        <Link 
          to="/login"
          className="text-white hover:bg-white/10 mb-4 cursor-pointer rounded-md px-5 py-1 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>

      <div className="bg-white text-gray-800 flex flex-col gap-6 rounded-xl border p-6 w-100 max-w-md mx-auto">
        <div className="text-center mb-2">
          <Store className="h-12 w-12 text-white bg-[#e53948] rounded-full p-3 mx-auto" />
        </div>

        <h1 className="text-[#1d3557] text-center text-xl font-bold">Create Your Shop</h1>
        <p className="text-[#457b9d] text-center -mt-3 text-sm">
          Register as a seller to start selling your products
        </p>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col">
            <label className="text-[#1d3557] mb-1 text-left text-sm">Shop Name:</label>
            <input
              type="text"
              placeholder="My Awesome Store"
              className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#1d3557] mb-1 text-left text-sm">Description:</label>
            <textarea
              placeholder="A short description about your shop"
              className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
              value={shopDescription}
              onChange={(e) => setShopDescription(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-left">{error}</p>}

          <button
            onClick={handleCreateShop}
            disabled={loading}
            className="bg-[#e53948] hover:bg-[#ec606c] text-white py-2 rounded-md font-medium cursor-pointer"
          >
            {loading ? "Creating..." : "Create Shop"}
          </button>

          <p className="text-center text-sm">
            Already have a shop?{" "}
            <Link
              to="/seller/login"
              className="text-[#e53948] hover:text-[#ec606c] cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateShopPage;
