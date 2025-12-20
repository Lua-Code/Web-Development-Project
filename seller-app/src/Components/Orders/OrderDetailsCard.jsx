import React, { useEffect, useState } from "react";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function OrderDetailsCard({ order, onStatusChanged }) {
  const [Orderstatus, setOrderStatus] = useState(order?.status || "pending");

  useEffect(() => {
    setOrderStatus(order?.status || "pending");
  }, [order]);

  if (!order) {
    return <p>There is no data passed till now</p>;
  }

  const firstItem =
    Array.isArray(order.items) && order.items.length > 0 ? order.items[0] : null;

  const shippedBut = async () => {
    if (Orderstatus === "shipped") return;

    try {
      const res = await fetch(`${API_URL}/api/orders/${order._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "shipped" }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || `Failed: ${res.status}`);
      }

      const updated = await res.json();
      setOrderStatus(updated.status);

      if (onStatusChanged) onStatusChanged(updated);
    } catch (e) {
      alert(e.message || "Failed to update status");
    }
  };

  return (
    <div className="OrderDetailsCard">
      <h3>
        <strong>Order #{order._id}</strong>
      </h3>

      <p>
        <strong>Product: {firstItem ? firstItem.title : "N/A"}</strong>
      </p>
      <p>
        <strong>Quantity: {firstItem ? firstItem.quantity : "N/A"}</strong>
      </p>
      <p>
        <strong>Price: ${firstItem ? firstItem.price : "N/A"}</strong>
      </p>

      <p>
        <strong>Total: ${order.total}</strong>
      </p>

      <p>
        <strong>Status: {Orderstatus}</strong>
      </p>

      <div className="status-badge-container">
        <span className={`status-badge ${String(Orderstatus).toLowerCase()}`}>
          {Orderstatus}
        </span>
      </div>

      <div>
        <button className="button contact">Contact Buyer</button>
        <br />
        <button className="button shipped" onClick={shippedBut}>
          Mark as Shipped
        </button>
      </div>
    </div>
  );
}

export default OrderDetailsCard;
