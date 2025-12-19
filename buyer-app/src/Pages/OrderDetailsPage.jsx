import React from "react";

function OrderDetails(){
    const order = {
        id: "102",
        status: "Delivered",
        items: [
            { name: "mouse", price: 200, quantity: 1 },
            { name: "keyboard", price: 500, quantity: 1}
        ],
        shippingAddress: "106 tomanbai",
        subtotal: 700,
        shipping: 50,
        total: 750
    };

    return(
        <div style = {{ backgroundColor: "#F1FAEE", fontFamily: "sans-serif", minHeight: "100vh", padding: "20px" }}>
            <h1 style = {{ color: "#1D3557", fontSize: "26px", fontWeight: "bold"}}>Order Details</h1>

            <div style = {{ backgroundColor: "#A8DADC", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                <p style = {{ color: "#E63946" }}><strong>Order ID:</strong> {order.id} </p>
                <p style = {{ color: "#E63946" }}><strong>Status:</strong> {order.status} </p>
                <h2 style = {{color:"#1D3557"}}>Items</h2>
                {order.items.map((item, index) => (
                    <div key={index} style = {{ marginBottom: "10px" }}>
                        <p>{item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                        <hr />
                    </div>
                ))}
            </div>

            <div style = {{backgroundColor: "#A8DADC", padding: "15px", borderRadius: "8px", marginBottom: "20px"}}>
                <h3 style={{color: "#1D3557"}}>Order Summary</h3>
                <p>Subtotal: ${order.subtotal}</p>
                <p>Shipping: ${order.shipping}</p>
                <p><strong>Total: ${order.total}</strong></p>
            </div>

            <div style={{border: "2px solid #457B9D", borderRadius: "8px", padding: "15px"}}>
                <h3 style={{ color: "#1D3557" }}>Shipping Address</h3>
                <p>{order.shippingAddress}</p>
            </div>
            
        </div>
    );

}
export default OrderDetails;