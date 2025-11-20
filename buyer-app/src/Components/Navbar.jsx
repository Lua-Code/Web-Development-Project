import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, Heart, Store } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
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
                to="/orders" 
                className="text-[#1d3557] hover:text-[#457b9d] transition-colors"
              >
                My Orders
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="http://localhost:5175/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex bg-[#e63946] hover:bg-[#c62d3a] text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Store className="h-4 w-4" />
              Start Selling
            </a>

            <button className="text-[#1d3557] hover:text-[#457b9d]">
              <User className="h-5 w-5" />
            </button>
            <button className="text-[#1d3557] hover:text-[#457b9d] relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-3 -right-3 bg-[#e63946] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </button>
            <button className="md:hidden text-[#1d3557]">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
