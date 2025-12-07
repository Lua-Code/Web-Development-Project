import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import  getTabPath  from "../Services/DashboardService"; // fixed import

const MainLayout = () => {
    const tabs = ["Dashboard", "My Products", "Orders", "Analytics", "Settings"];
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        /* authentication logic later */
        window.location.href = "http://localhost:5173/"; // replace with buyer URL
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f1faee]">
            <Navbar onLogout={handleLogout} />

            <div className="min-h-screen bg-[#F1FAEE]">
                {/* NAV TABS */}
                <div className="px-6 mt-5">
                    <div className="flex gap-2 bg-white rounded-full px-2 py-1 w-fit shadow">
                        {tabs.map((t) => (
                            <button
                                key={t}
                                onClick={() => navigate(getTabPath(t))}
                                className={`px-4 py-2 rounded-full text-sm transition ${location.pathname === getTabPath(t)
                                        ? "bg-white shadow font-medium text-[#1D3557]"
                                        : "text-gray-500 hover:bg-[#F1F1F1]"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* PAGE CONTENT */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
