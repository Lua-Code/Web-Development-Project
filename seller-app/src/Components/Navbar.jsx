import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "./Avatar";
import { useEffect, useState } from "react";

const Navbar = ({ onLogout }) => {
  const [seller, setSeller] = useState(null);

  // Fetch the current seller info
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/seller/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setSeller(data); 
        }
      } catch (err) {
        console.error("Failed to fetch seller:", err);
      }
    };

    fetchSeller();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setSeller(null);
        if (onLogout) onLogout(); // optional parent callback
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-b border-[#e5eaf0] bg-white">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-[#1d3557] text-white">
                {seller ? seller.storeName.slice(0, 2) : "SS"}
              </AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <h2 className="text-[#1d3557] font-semibold text-lg">
                {seller ? seller.storeName : "Seller Dashboard"}
              </h2>
              <p className="text-sm text-[#457b9d]">Seller Account</p>
            </div>
          </div>

           
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border bg-[#f1faee] border-[#457b9d] rounded-sm p-1 px-2 text-[#457b9d] hover:text-[#ffffff] hover:bg-[#e63946] font-medium transition cursor-pointer"
            >
              <LogOut size={18} />
              Logout
            </button>
          

        </div>
      </div>
    </div>
  );
};

export default Navbar;
