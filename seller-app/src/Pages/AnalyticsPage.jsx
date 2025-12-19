
import ProductItem from "../Components/Analytics/ProductItem";
import SalesItem from "../Components/Analytics/SalesItem";
import RevenueByCategoryItem from "../Components/Analytics/RevenueByCategoryItem";


const AnalyticsPage = () => {
    const salesItems = [
        { title: "Total Orders", value: "4" },
        { title: "Total Revenue", value: "$1229.98" },
        { title: "Average Order Value", value: "$307.50" },
        { title: "Conversion Rate", value: "12%" },
    ];

    const prodcutItems = [
        { title: "Total Products", value: "3" },
        { title: "Active Listings", value: "3" },
        { title: "Total Views", value: "479" },
        { title: "Avg. Views per Product", value: "160" },
    ];

    const categories = [
        { category: "Electronics", revenue: "1049.98", percentage: "85.6" },
        { category: "Fashion", revenue: "180.00", percentage: "14.4" },
        

    ]

    return (
        <div>
            <h3 className="mb-4 font-semibold text-xl text-[#1D3557] text-left">Sales Analytics</h3>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

                <div className="bg-white rounded-xl p-6">
                    <h3 className="mb-4 font-semibold text-lg text-[#1D3557] pl-3 text-left">Sales Overview</h3>
                    {salesItems.map((item, index) => (
                        <SalesItem
                            key={index}
                            title={item.title}
                            value={item.value}
                        />
                    ))}

                </div>


                <div className="bg-white rounded-xl p-6">
                    <h3 className="mb-4 font-semibold text-lg text-[#1D3557] pl-3 text-left">Product Performance</h3>
                    {prodcutItems.map((item, index) => (
                        <ProductItem
                            key={index}
                            title={item.title}
                            value={item.value}
                        />
                    ))}
                </div>


            </section>

            <section className="mt-7">
                <div className="bg-white rounded-xl p-6">
                    <h3 className="mb-4 font-semibold text-lg text-[#1D3557] pl-3 text-left">Revenue by Category</h3>
                    {categories.map((c,index) => (
                        <RevenueByCategoryItem 
                            key = {index}
                            category = {c.category}
                            revenue = {c.revenue}
                            percentage = {c.percentage}
                        />

                    ))}
                </div>
            </section>
        </div>
    )
}

export default AnalyticsPage