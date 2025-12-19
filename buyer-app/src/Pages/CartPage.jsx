import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "T-Shirt", price: 500, quantity: 3 },
    { id: 2, name: "Jeans", price: 900, quantity: 1 },
  ]);

  const navigate = useNavigate();

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
        <h1
          style={{
            color: "#1D3557",
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p
            style={{
              color: "#457B9D",
              fontSize: "18px",
            }}
          >
            Your cart is empty.
          </p>
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
                    <p
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1D3557",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#457B9D",
                      }}
                    >
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
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#1D3557",
                }}
              >
                Total: ${total}
              </p>

              <button
                onClick={() => navigate("/CheckoutPage")}
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
    </div>
  );
}

export default CartPage;
