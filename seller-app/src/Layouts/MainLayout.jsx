import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { getTabPath } from "../Services/DashboardService";
import { ChartColumn, Package, ShoppingBag, TrendingUp, Settings } from "lucide-react";

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        /* authentication logic later */
        window.location.href = "http://localhost:5173/"; // replace with buyer URL
    };

    const tabClass = (path) =>
        `flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm transition ${
            location.pathname === path
                ? "bg-white shadow font-medium text-[#1D3557]"
                : "text-gray-500 hover:bg-[#F1F1F1]"
        }`;

    return (
        <div className="flex flex-col min-h-screen bg-[#f1faee]">
            <Navbar onLogout={handleLogout} />

            <div className="min-h-screen bg-[#F1FAEE] py-4 px-6">
                {/* NAV TABS */}
                <div className="px-6 mt-5">
                    <div className="flex gap-2 bg-white rounded-full px-2 py-1 w-fit shadow">
                        <button
                            onClick={() => navigate(getTabPath("Dashboard"))}
                            className={tabClass(getTabPath("Dashboard"))}
                        >
                            <ChartColumn size={16} />
                            Dashboard
                        </button>

                        <button
                            onClick={() => navigate(getTabPath("My Products"))}
                            className={tabClass(getTabPath("My Products"))}
                        >
                            <Package size={16} />
                            My Products
                        </button>

                        <button
                            onClick={() => navigate(getTabPath("Orders"))}
                            className={tabClass(getTabPath("Orders"))}
                        >
                            <ShoppingBag size={16} />
                            Orders
                        </button>

                        <button
                            onClick={() => navigate(getTabPath("Analytics"))}
                            className={tabClass(getTabPath("Analytics"))}
                        >
                            <TrendingUp size={16} />
                            Analytics
                        </button>

                        <button
                            onClick={() => navigate(getTabPath("Settings"))}
                            className={tabClass(getTabPath("Settings"))}
                        >
                            <Settings size={16} />
                            Settings
                        </button>
                    </div>
                </div>

                {/* PAGE CONTENT */}
                <main className="flex-1 p-7">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
