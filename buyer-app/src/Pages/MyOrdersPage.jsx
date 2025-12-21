import React, { useEffect, useState } from 'react';

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/orders", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then(data => {
        const ordersWithComments = data.map(order => ({
          ...order,
          comment: order.comment || ""
        }));
        setOrders(ordersWithComments);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCommentChange = (orderId, value) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, comment: value } : order
      )
    );
  };

  const handleSaveComment = async (orderId, comment) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${orderId}/comment`, {
        method: "PUT", 
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save comment");
      }

      alert("Comment saved!");
    } catch (err) {
      console.error(err);
      alert("Error saving comment: " + err.message);
    }
  };

  return (
    <div style={{ background: "#F1FAEE", padding: "30px", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#1D3557", fontSize: "26px", fontWeight: "bold" }}>
        My Orders
      </h1>
      <p style={{ color: "#457B9D", marginBottom: "20px" }}>
        Track and manage your recent purchases
      </p>

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
                flexDirection: "column"
              }}
            >
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
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
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: "#1D3557", marginBottom: "6px" }}>
                    {order.productName}
                  </h3>
                  <p style={{ color: "#457B9D", fontSize: "14px" }}>Order ID: #{order.id}</p>
                  <p style={{ color: "#457B9D", fontSize: "14px" }}>Date: {order.date}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#E63946", fontWeight: "bold", fontSize: "18px" }}>${order.price}</p>
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

              {/* Comment input */}
              <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
                <label
                  style={{
                    color: "#1D3557",
                    fontWeight: "bold",
                    fontSize: "15px",
                    minWidth: "150px",
                    textAlign: "right",
                  }}
                >
                  Enter a Comment:
                </label>
                <input
                  type="text"
                  value={order.comment}
                  onChange={e => handleCommentChange(order.id, e.target.value)}
                  placeholder="Add comment for seller..."
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    outline: "none",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                  }}
                />
                <button
                  onClick={() => handleSaveComment(order.id, order.comment)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1D3557",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;
