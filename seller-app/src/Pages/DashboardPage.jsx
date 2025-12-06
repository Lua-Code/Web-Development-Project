export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-emerald-50 p-6">

            {/* Alerts */}
            <div className="space-y-3 mb-6">
                <Alert
                    text="2 orders awaiting shipment"
                    action="View Orders"
                />
                <Alert
                    text="2 items running low on stock"
                    action="View Inventory"
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Active Listings" value="3" />
                <StatCard title="Total Revenue" value="$1229.98" />
                <StatCard title="Growth" value="+23%" />
                <StatCard title="Pending Orders" value="2" />
                <StatCard title="Avg. Rating" value="4.9" />
                <StatCard title="Total Views" value="479" />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

                    <OrderItem
                        name="Wireless Headphones Pro"
                        customer="John Smith"
                        status="pending"
                    />
                    <OrderItem
                        name="Vintage Camera"
                        customer="Sarah Johnson"
                        status="pending"
                    />
                    <OrderItem
                        name="Wireless Headphones Pro"
                        customer="Mike Brown"
                        status="shipped"
                    />
                    <OrderItem
                        name="Designer Sneakers"
                        customer="Emma Davis"
                        status="delivered"
                    />
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>

                    <ProductItem
                        name="Wireless Headphones Pro"
                        sales="12 sales"
                        price="$299.99"
                    />
                    <ProductItem
                        name="Designer Sneakers"
                        sales="8 sales"
                        price="$180"
                    />
                    <ProductItem
                        name="Vintage Camera"
                        sales="3 sales"
                        price="$450"
                    />
                </div>
            </div>
        </div>
    );
}

/* ---------------- Components ---------------- */

function Alert({ text, action }) {
    return (
        <div className="flex items-center justify-between bg-amber-50 border-l-4 border-red-400 px-4 py-3 rounded-lg">
            <span className="text-gray-700">⚠️ {text}</span>
            <a href="#" className="text-emerald-600 font-medium hover:underline">
                {action}
            </a>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">{title}</p>
            <h2 className="text-2xl font-semibold">{value}</h2>
        </div>
    );
}

function OrderItem({ name, customer, status }) {
    const statusStyles = {
        pending: "bg-red-500",
        shipped: "bg-sky-500",
        delivered: "bg-slate-800",
    };

    return (
        <div className="flex items-center justify-between py-3 border-b last:border-none">
            <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">{customer}</p>
            </div>

            <span
                className={`text-white text-xs px-3 py-1 rounded-full capitalize ${statusStyles[status]}`}
            >
                {status}
            </span>
        </div>
    );
}

function ProductItem({ name, sales, price }) {
    return (
        <div className="flex items-center justify-between py-3 border-b last:border-none">
            <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">{sales}</p>
            </div>

            <span className="font-semibold text-rose-600">{price}</span>
        </div>
    );
}
