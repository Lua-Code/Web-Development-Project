import { useState } from "react";
import RecentOrderItem from "../Components/Dashboard/RecentOrderItem";
import TopSellingProductItem from "../Components/Dashboard/TopSellingProductItem";
import { Box, DollarSignIcon, ChartArea, Star, Eye, Hourglass } from "lucide-react";


function DashboardPage() {
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

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

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

export default DashboardPage



