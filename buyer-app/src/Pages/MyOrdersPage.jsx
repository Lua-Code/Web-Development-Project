import React, { useEffect, useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

function MyOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //addedfor myorders
       fetch("http://localhost:5000/orders", { credentials: "include" })
        /////////////
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch orders");
                return res.json();
            })
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
      
            <div style={{ background: "#F1FAEE", padding: "30px", minHeight: "100vh", fontFamily: "sans-serif" }}>

                {/* Header */}
                <h1 style={{ color: "#1D3557", fontSize: "26px", fontWeight: "bold" }}>
                    My Orders
                </h1>
                <p style={{ color: "#457B9D", marginBottom: "20px" }}>
                    Track and manage your recent purchases
                </p>

                {/* Status */}
                {loading && <p>Loading orders...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <div style={{ display: "grid", gap: "20px" }}>

                        {orders.length === 0 && (
                            <p style={{ color: "#457B9D" }}>You have no orders yet.</p>
                        )}

                        {orders.map(order => (
                            <div
                                key={order.id}
                                style={{
                                    background: "#FFFFFF",
                                    borderRadius: "10px",
                                    padding: "20px",
                                    display: "flex",
                                    gap: "20px",
                                    alignItems: "center"
                                }}
                            >
                                {/* Product Image */}
                                <img
                                    src={order.image}
                                    alt={order.productName}
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                />

                                {/* Order Info */}
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ color: "#1D3557", marginBottom: "6px" }}>
                                        {order.productName}
                                    </h3>
                                    <p style={{ color: "#457B9D", fontSize: "14px" }}>
                                        Order ID: #{order.id}
                                    </p>
                                    <p style={{ color: "#457B9D", fontSize: "14px" }}>
                                        Date: {order.date}
                                    </p>
                                </div>

                                {/* Price & Status */}
                                <div style={{ textAlign: "right" }}>
                                    <p style={{ color: "#E63946", fontWeight: "bold", fontSize: "18px" }}>
                                        ${order.price}
                                    </p>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            marginTop: "6px",
                                            padding: "4px 10px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            background:
                                                order.status === "Delivered" ? "#2A9D8F" :
                                                order.status === "Pending" ? "#F4A261" : "#457B9D",
                                            color: "#FFFFFF"
                                        }}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
       
    );
}

export default MyOrdersPage;