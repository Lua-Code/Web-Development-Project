import { useEffect, useState } from "react";
import RecentOrderItem from "../Components/Dashboard/RecentOrderItem";
import TopSellingProductItem from "../Components/Dashboard/TopSellingProductItem";
import StatsCard from "../Components/Dashboard/StatsCard";
import { Box, DollarSignIcon, ChartArea, Star, Eye, Hourglass } from "lucide-react";

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/seller/dashboard", {
          credentials: "include"
        });

        const data = await res.json();
        console.log("Dashboard data:", data);
        console.log("seocnd array:", data.recentOrders[1]);
        if (!res.ok) throw new Error(data.message || "Failed to load dashboard");

        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        setTopProducts(data.topProducts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const cards = [
    { title: "Active Listings", value: stats.activeListings, icon: Box },
    { title: "Total Revenue", value: `$${stats.totalRevenue}`, icon: DollarSignIcon },
    { title: "Growth", value: `+${stats.growth}%`, icon: ChartArea },
    { title: "Pending Orders", value: stats.pendingOrders, icon: Hourglass },
    { title: "Avg. Rating", value: stats.avgRating, icon: Star },
    { title: "Total Views", value: stats.totalViews, icon: Eye },
  ];

  return (
    <>
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {cards.map((c, index) => {
          const isRedCard = ["Total Revenue", "Avg. Rating", "Pending Orders"].includes(c.title);
          const circleColor = isRedCard ? "#efafb4ff" : "#A8DADC";
          const iconColor = isRedCard ? "#b30808ff" : "#1D3557";

          return (
            <StatsCard
              key={index}
              Icon={c.icon}
              title={c.title}
              value={c.value}
              IconColor={iconColor}
              CircleColor={circleColor}
            />
          );
        })}
      </div>

      {/* ORDERS + PRODUCTS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="bg-white rounded-xl p-6">
          <h3 className="mb-4 font-semibold text-lg text-[#1D3557]">Recent Orders</h3>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <RecentOrderItem
                key={order.id}
                product={order.product}
                buyer={order.buyer}
                price={order.total}
                status={order.status}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h3 className="mb-4 font-semibold text-lg text-[#1D3557]">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map(p => (
              <TopSellingProductItem
                key={p.id}
                title={p.title}
                sales={p.sales}
                price={p.price}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardPage;
