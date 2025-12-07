import { useState } from "react";
import RecentOrderItem from "../Components/Dashboard/RecentOrderItem";
import TopSellingProductItem from "../Components/Dashboard/TopSellingProductItem";
import { Box, DollarSignIcon, ChartArea, Star, Eye, Hourglass } from "lucide-react";

export default function Dashboard() {
    const [tab, setTab] = useState("Dashboard");

    const tabs = ["Dashboard", "My Products", "Orders", "Analytics", "Settings"];

    return (
        <div className="min-h-screen bg-[#F1FAEE]">
            {/* HEADER */}
            <header className="flex items-center justify-between px-6 py-4">
                <div />
            </header>

            {/* NAV TABS */}
            <div className="px-6 mt-2">
                <div className="flex gap-2 bg-white rounded-full px-2 py-1 w-fit shadow">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded-full text-sm transition ${tab === t
                                    ? "bg-white shadow font-medium text-[#1D3557]"
                                    : "text-gray-500 hover:bg-[#F1F1F1]"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT */}
            <main className="px-6 py-6 space-y-6">
                {tab === "Dashboard" && <DashboardHome />}
                {tab === "My Products" && <Placeholder title="My Products" />}
                {tab === "Orders" && <Orders />}
                {tab === "Analytics" && <Analytics />}
                {tab === "Settings" && <Placeholder title="Settings" />}
            </main>
        </div>
    );
}

function DashboardHome() {
    const cards = [
        { title: "Active Listings", value: "3", icon: Box },
        { title: "Total Revenue", value: "$1229.98", icon: DollarSignIcon },
        { title: "Growth", value: "+23%", icon: ChartArea },
        { title: "Pending Orders", value: "2", icon: Hourglass },
        { title: "Avg. Rating", value: "4.9", icon: Star },
        { title: "Total Views", value: "479", icon: Eye },
    ];

    return (
        <>
            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-150 w-full">
                {cards.map((c) => {
                    const Icon = c.icon;
                    const isRedCard = ["Total Revenue", "Avg. Rating", "Pending Orders"].includes(c.title);
                    const circleColor = isRedCard ? "#efafb4ff" : "#A8DADC"; // circle background
                    const iconColor = isRedCard ? "#b30808ff" : "#1D3557"; // icon color

                    return (
                        <div
                            key={c.title}
                            className="bg-white rounded-xl p-6 flex flex-col items-start gap-6  "
                        >
                            {/* ICON CIRCLE */}
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: circleColor }}
                            >
                                <Icon size={25} style={{ color: iconColor }} />
                            </div>

                            {/* TITLE */}
                            <p className="text-lg" style={{ color: "#1a4d95ff" }}>{c.title}</p>

                            {/* VALUE */}
                            <p className="text-2xl font-semibold text-[#1D3557]">{c.value}</p>
                        </div>
                    );
                })}


            </div>

<section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

    <div className="bg-white rounded-xl p-6">  
        <h3 className="mb-4 font-semibold text-lg text-[#1D3557]">Recent Orders</h3>
        <div className="space-y-4">
            <RecentOrderItem product="Wireless Headphones Pro" buyer="John Smith" price="299.99" status="Pending" />
            <RecentOrderItem product="Vintage Camera" buyer="Sarah Johnson" price="450.00" status="Pending" />
            <RecentOrderItem product="Designer Sneakers" buyer="Emma Davis" price="180.00" status="Delivered" />
        </div>
    </div>

    
    <div className="bg-white rounded-xl p-6"> 
        <h3 className="mb-4 font-semibold text-lg text-[#1D3557]">Top Selling Products</h3>
        <div className="space-y-4">
            <TopSellingProductItem title="Wireless Headphones Pro" sales="12" price="299.99" />
            <TopSellingProductItem title="Designer Sneakers" sales="8" price="180.00" />
            <TopSellingProductItem title="Vintage Camera" sales="3" price="450.00" />
        </div>
    </div>
</section>


        </>
    );
}



