import React, { useEffect, useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

function CheckoutPage() {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");

    useEffect(() => {
        //new
        fetch("http://localhost:5000/cart", { credentials: "include" })
        ////
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch cart items");
                return res.json();
            })
            .then(data => {
                setCartItems(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const placeOrder = () => {
        fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
  /*the new part*/ 
            credentials: "include",
            body: JSON.stringify({
                items: cartItems,
                address,
                paymentMethod,
                total: totalPrice
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Order failed");
            alert("Order placed successfully!");
        })
        .catch(err => alert(err.message));
    };

    return (
       
            <div style={{ background: "#F1FAEE", padding: "30px", minHeight: "100vh", fontFamily: "sans-serif" }}>

                {/* Header */}
                <h1 style={{ color: "#1D3557", fontSize: "26px", fontWeight: "bold" }}>
                    Checkout
                </h1>
                <p style={{ color: "#457B9D", marginBottom: "20px" }}>
                    Review your order and complete payment
                </p>

                {loading && <p>Loading checkout...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <div style={{ display: "flex", gap: "20px" }}>

                        {/* Left: Cart Items */}
                        <div style={{ flex: 2 }}>
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    style={{
                                        background: "#FFFFFF",
                                        borderRadius: "10px",
                                        padding: "15px",
                                        display: "flex",
                                        gap: "15px",
                                        marginBottom: "15px"
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "8px"
                                        }}
                                    />

                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ color: "#1D3557" }}>{item.name}</h4>
                                        <p style={{ color: "#457B9D", fontSize: "14px" }}>
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <p style={{
                                        color: "#E63946",
                                        fontWeight: "bold",
                                        fontSize: "16px"
                                    }}>
                                        ${item.price * item.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Right: Summary */}
                        <div style={{
                            flex: 1,
                            background: "#FFFFFF",
                            borderRadius: "10px",
                            padding: "20px",
                            height: "fit-content"
                        }}>
                            <h3 style={{ color: "#1D3557", marginBottom: "10px" }}>
                                Order Summary
                            </h3>

                            <p style={{ color: "#457B9D" }}>
                                Items: {cartItems.length}
                            </p>

                            <p style={{
                                color: "#E63946",
                                fontWeight: "bold",
                                fontSize: "18px",
                                margin: "10px 0"
                            }}>
                                Total: ${totalPrice.toFixed(2)}
                            </p>

                            {/* Address */}
                            <p style={{ marginTop: "15px", fontWeight: "600" }}>
                                Shipping Address
                            </p>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter shipping address"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    marginTop: "5px"
                                }}
                            />

                            {/* Payment */}
                            <p style={{ marginTop: "15px", fontWeight: "600" }}>
                                Payment Method
                            </p>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    marginTop: "5px"
                                }}
                            >
                                <option value="cash">Cash on Delivery</option>
                                <option value="card">Credit Card</option>
                            </select>

                            <button
                                onClick={placeOrder}
                                style={{
                                    marginTop: "20px",
                                    width: "100%",
                                    padding: "12px",
                                    background: "#457B9D",
                                    color: "#F1FAEE",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontWeight: "600"
                                }}
                            >
                                Place Order
                            </button>
                        </div>

                    </div>
                )}
            </div>
       
    );
}

export default CheckoutPage;
