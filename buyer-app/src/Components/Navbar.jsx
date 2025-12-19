import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, Store , Settings } from "lucide-react";

export default function Navbar() {
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
              <span className="absolute -top-3 -right-3 bg-[#e63946] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
              </Link>

              <Link
                 to="/settings"
                  className="text-[#1d3557] hover:text-[#457b9d] cursor-pointer"
                   >
                   <Settings className="h-5 w-5" />
                    </Link>

              <Link
            to="/register"
            className="bg-[#457b9d] hover:bg-[#1d3557] text-white px-4 py-2 rounded font-medium"
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
