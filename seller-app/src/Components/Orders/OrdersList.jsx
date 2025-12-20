import React, { useEffect, useState } from "react";
import OrderDetailsCard from "./OrderDetailsCard";
import "./orderdesign.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load orders for the logged-in seller
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`http://localhost:5000/api/orders/me`, {
        credentials: "include", // send session cookie
      });

      if (!res.ok) throw new Error(`Failed: ${res.status}`);

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChanged = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
    );
  };

  if (loading) return <div>Loading…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="orders-page">
      <div className="orders-list">
        {orders.map((order) => (
          <OrderDetailsCard
            key={order._id}
            order={order}
            onStatusChanged={handleStatusChanged}
          />
        ))}
      </div>
    </div>
  );
}

export default OrdersList;
