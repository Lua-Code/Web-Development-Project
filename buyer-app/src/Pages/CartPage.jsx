import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showPayment, setShowPayment] = useState(false);

  const [address, setAddress] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/cart`, { credentials: "include" });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to fetch cart");
      }

      const data = await res.json();
      setCartItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    try {
      const res = await fetch(`${API_URL}/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to remove item");
      }

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      if (!address.trim()) return alert("Please enter your address.");
      if (!cardHolderName.trim()) return alert("Please enter card holder name.");
      if (cardNumber.trim().length < 12) return alert("Please enter a valid card number.");
      if (!expiry.trim()) return alert("Please enter expiry date.");
      if (cvv.trim().length < 3) return alert("Please enter a valid CVV.");

      const res = await fetch(`${API_URL}/api/transactions/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          paymentMethod: "card",
          cardHolderName,
          cardNumber,
          expiry,
          cvv
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Checkout failed");
      }

      alert("Payment successful! Order created.");
      setShowPayment(false);

      // backend clears cart
      setCartItems([]);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F1FAEE",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "60px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ color: "#1D3557", fontSize: "32px", fontWeight: "700", marginBottom: "20px" }}>
          Your Cart
        </h1>

        {loading ? (
          <p style={{ color: "#457B9D", fontSize: "18px" }}>Loading...</p>
        ) : error ? (
          <p style={{ color: "#E63946", fontSize: "18px" }}>{error}</p>
        ) : cartItems.length === 0 ? (
          <p style={{ color: "#457B9D", fontSize: "18px" }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#1D3557" }}>
                      {item.name}
                    </p>
                    <p style={{ margin: "6px 0 0", color: "#457B9D" }}>
                      ${item.price} × {item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      backgroundColor: "#E63946",
                      color: "#F1FAEE",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "22px", fontWeight: "700", color: "#1D3557" }}>
                Total: ${total}
              </p>

              <button
                onClick={() => setShowPayment(true)}
                style={{
                  backgroundColor: "#E63946",
                  color: "#F1FAEE",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {showPayment && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "420px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ margin: 0, color: "#1D3557" }}>Payment</h2>
            <p style={{ color: "#457B9D", marginTop: "6px" }}>Total: ${total}</p>

            <p style={{ marginTop: "12px", fontWeight: "600" }}>Address</p>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />

            <p style={{ marginTop: "12px", fontWeight: "600" }}>Card Holder Name</p>
            <input
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              placeholder="Name on card"
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />

            <p style={{ marginTop: "12px", fontWeight: "600" }}>Card Number</p>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: "600" }}>Expiry</p>
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: "600" }}>CVV</p>
                <input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
              <button
                onClick={() => setShowPayment(false)}
                style={{
                  flex: 1,
                  backgroundColor: "#ccc",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleCheckout}
                style={{
                  flex: 1,
                  backgroundColor: "#457B9D",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
