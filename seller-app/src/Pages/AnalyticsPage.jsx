import { useState, useEffect } from "react";
import ProductItem from "../Components/Analytics/ProductItem";
import SalesItem from "../Components/Analytics/SalesItem";
import RevenueByCategoryItem from "../Components/Analytics/RevenueByCategoryItem";

const AnalyticsPage = () => {
    const [salesItems, setSalesItems] = useState([]);
    const [productItems, setProductItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/seller/analytics", {
                    credentials: "include", // important for session cookies
                });
                const data = await response.json();
                console.log("Analytics data:", data);

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch analytics");
                }

                // Populate Sales Overview
                setSalesItems([
                    { title: "Total Orders", value: data.sales.totalOrders },
                    { title: "Total Revenue", value: `$${data.sales.totalRevenue}` },
                    { title: "Average Order Value", value: `$${data.sales.averageOrderValue}` },
                ]);

                // Populate Product Performance
                setProductItems([
                    { title: "Total Listings", value: data.listings.totalListings },
                    { title: "Active Listings", value: data.listings.activeListings },
                ]);

                // Populate Revenue by Category
                setCategories(
                    data.revenueByCategory.map((c) => ({
                        category: c.category,
                        revenue: `$${c.revenue}`,
                        percentage: c.percentage,
                    }))
                );

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <div>Loading analytics...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h3 className="mb-4 font-semibold text-xl text-[#1D3557] text-left">Sales Analytics</h3>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                <div className="bg-white rounded-xl p-6">
                    <h3 className="mb-4 font-semibold text-lg text-[#1D3557] pl-3 text-left">Sales Overview</h3>
                    {salesItems.map((item, index) => (
                        <SalesItem key={index} title={item.title} value={item.value} />
                    ))}
                </div>

                <div className="bg-white rounded-xl p-6">
                    <h3 className="mb-4 font-semibold text-lg text-[#1D3557] pl-3 text-left">Product Performance</h3>
                    {productItems.map((item, index) => (
                        <ProductItem key={index} title={item.title} value={item.value} />
                    ))}
                </div>
            </section>

            <section className="mt-7">
                <div className="bg-white rounded-xl p-6">
                    <h3 className="mb-4 font-semibold text-lg text-[#1D3557] pl-3 text-left">Revenue by Category</h3>
                    {categories.map((c, index) => (
                        <RevenueByCategoryItem
                            key={index}
                            category={c.category}
                            revenue={c.revenue}
                            percentage={c.percentage}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AnalyticsPage;
