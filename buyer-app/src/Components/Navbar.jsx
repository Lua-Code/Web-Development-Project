import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, Store, Settings } from "lucide-react";
import { useState, useEffect } from "react";



export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error(err);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
    console.log("Current User in Navbar:", currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setCurrentUser(null);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };


  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="w-full px-12 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-[#1d3557] text-lg font-bold">
              Ventura
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/marketplace"
                className="text-[#1d3557] hover:text-[#457b9d] transition-colors"
              >
                Browse
              </Link>
              <Link
                to="/my-orders"
                className="text-[#1d3557] hover:text-[#457b9d] transition-colors"
              >
                My Orders
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="http://localhost:5174/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex bg-[#e63946] hover:bg-[#c62d3a] text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Store className="h-4 w-4" />
              Start Selling
            </a>

            <button className="text-[#1d3557] hover:text-[#457b9d] cursor-pointer">
              <User className="h-5 w-5" />
            </button>

            <Link className="text-[#1d3557] hover:text-[#457b9d] relative cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-3 -right-3 bg-[rgb(230,57,70)] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </Link>

            <Link
              to="/settings"
              className="text-[#1d3557] hover:text-[#457b9d] cursor-pointer"
            >
              <Settings className="h-5 w-5" />
            </Link>


            {currentUser ? (
              <button
                onClick={handleLogout}
                className="bg-[#457b9d] hover:bg-[#1d3557] text-white px-4 py-2 rounded font-medium"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-[#457b9d] hover:bg-[#1d3557] text-white px-4 py-2 rounded font-medium"
              >
                Log In
              </Link>
            )}




            <Link
              to="/register"
              className="bg-[rgb(229,37,53)] hover:bg-[rgb(230,57,70)] text-white px-4 py-2 rounded font-medium"
            >
              Sign Up
            </Link>


            <button className="md:hidden text-[#1d3557]">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
