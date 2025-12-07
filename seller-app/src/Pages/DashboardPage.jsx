import { useState } from "react";

export default function Dashboard() {
    const [tab, setTab] = useState("Dashboard");

    const tabs = ["Dashboard", "My Products", "Orders", "Analytics", "Settings"];

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F1FAEE" }}>
            {/* HEADER */}
            <header className="flex items-center justify-between px-6 py-4">
                <div />

                <button className="px-4 py-2 border rounded-full bg-white text-sm">
                    Logout
                </button>
            </header>



            {/* NAV TABS */}
            <div className="px-6 mt-2">
                <div className="flex gap-2 bg-white rounded-full px-2 py-1 w-fit shadow">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded-full text-sm transition ${tab === t
                                ? "bg-white shadow font-medium"
                                : "text-gray-500"
                                }`}
                            style={{
                                color: tab === t ? "#1D3557" : undefined,
                            }}
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

/* ================= DASHBOARD ================= */

function DashboardHome() {
    const cards = [
        { title: "Active Listings", value: "3", icon: "📦" },
        { title: "Total Revenue", value: "$1229.98", icon: "💲" },
        { title: "Growth", value: "+23%", icon: "📈" },
        { title: "Pending Orders", value: "2", icon: "⏳" },
        { title: "Avg. Rating", value: "4.9", icon: "⭐" },
        { title: "Total Views", value: "479", icon: "👁️" },
    ];

    return (
        <>
            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((c) => (
                    <div
                        key={c.title}
                        className="bg-white rounded-xl p-6"
                    >
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: "#A8DADC" }}
                                >
                                    {c.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{c.title}</p>
                                    <p
                                        className="mt-4 text-lg font-semibold"
                                        style={{ color: "#1D3557" }}
                                    >
                                        {c.value}
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400">+2</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* RECENT ORDERS */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h3
                        className="mb-4 font-semibold text-lg"
                        style={{ color: "#1D3557" }}
                    >
                        Recent Orders
                    </h3>

                    <OrderRow
                        product="Wireless Headphones Pro"
                        buyer="John Smith"
                        price="299.99"
                        status="Pending"
                    />
                    <OrderRow
                        product="Vintage Camera"
                        buyer="Sarah Johnson"
                        price="450.00"
                        status="Pending"
                    />
                    <OrderRow
                        product="Designer Sneakers"
                        buyer="Emma Davis"
                        price="180.00"
                        status="Delivered"
                    />
                </div>

                {/* TOP PRODUCTS */}
                <div>
                    <h3
                        className="mb-4 font-semibold text-lg"
                        style={{ color: "#1D3557" }}
                    >
                        Top Selling Products
                    </h3>

                    <div className="bg-white rounded-xl p-4 space-y-4">
                        <ProductRow title="Wireless Headphones Pro" sales="12" price="299.99" />
                        <ProductRow title="Designer Sneakers" sales="8" price="180.00" />
                        <ProductRow title="Vintage Camera" sales="3" price="450.00" />
                    </div>
                </div>
            </section>
        </>
    );
}

/* ================= COMPONENTS ================= */

function OrderRow({ product, buyer, price, status }) {
    const isPending = status === "Pending";

    return (
        <div className="bg-white rounded-xl p-4 mb-4 flex justify-between items-center">
            <div>
                <p className="font-medium" style={{ color: "#1D3557" }}>
                    {product}
                </p>
                <p className="text-sm text-gray-500">{buyer}</p>
            </div>

            <div className="flex items-center gap-4">
                <span
                    className="px-3 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: isPending ? "#E63946" : "#457B9D" }}
                >
                    {status}
                </span>
                <span
                    className="font-medium"
                    style={{ color: "#E63946" }}
                >
                    ${price}
                </span>
            </div>
        </div>
    );
}

function ProductRow({ title, sales, price }) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <p className="font-medium" style={{ color: "#1D3557" }}>
                    {title}
                </p>
                <p className="text-sm text-gray-500">{sales} sales</p>
            </div>
            <span style={{ color: "#E63946" }}>${price}</span>
        </div>
    );
}

/* ================= OTHER PAGES ================= */

function Orders() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: "#1D3557" }}>
                Order Management
            </h2>
            <OrderRow product="Wireless Headphones Pro" buyer="John Smith" price="299.99" status="Pending" />
            <OrderRow product="Vintage Camera" buyer="Sarah Johnson" price="450.00" status="Pending" />
            <OrderRow product="Designer Sneakers" buyer="Emma Davis" price="180.00" status="Delivered" />
        </div>
    );
}

function Analytics() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: "#1D3557" }}>
                Sales Analytics
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl">
                    <h3 className="font-medium mb-4">Sales Overview</h3>
                    <Stat line="Total Orders" value="4" />
                    <Stat line="Total Revenue" value="$1229.98" red />
                    <Stat line="Average Order Value" value="$307.50" />
                    <Stat line="Conversion Rate" value="0.84%" />
                </div>

                <div className="bg-white p-6 rounded-xl">
                    <h3 className="font-medium mb-4">Product Performance</h3>
                    <Stat line="Total Products" value="3" />
                    <Stat line="Active Listings" value="3" />
                    <Stat line="Total Views" value="479" />
                    <Stat line="Avg Views / Product" value="160" />
                </div>
            </div>
        </div>
    );
}

function Stat({ line, value, red }) {
    return (
        <div className="flex justify-between py-2 text-sm border-b last:border-none">
            <span className="text-gray-500">{line}</span>
            <span style={{ color: red ? "#E63946" : "#1D3557" }}>{value}</span>
        </div>
    );
}

function Placeholder({ title }) {
    return (
        <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold" style={{ color: "#1D3557" }}>
                {title}
            </h2>
            <p className="text-gray-500 mt-2">Content goes here…</p>
        </div>
    );
}
