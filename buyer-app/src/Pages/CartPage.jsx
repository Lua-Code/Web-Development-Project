import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function CartPage(){
    const [cartItems, setCartItems] = useState([
        {id: 1, name: "t-shirt", price: 500, quantity: 3},
        {id: 2, name: "jeans", price: 900, quantity: 1},
    ])

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    let total = 0;
    for(let i = 0; i < cartItems.length; i++){
        total += cartItems[i].price * cartItems[i].quantity;
    }

    const navigate = useNavigate();

    return(
        <div>
            <div style={{ background: "#F1FAEE", padding: "30px", fontFamily: "sans-serif", minHeight: "100vh" }}>
                <h1 style={{ color: "#1D3557", fontSize: "30px", fontWeight: "bold" }}>Cart Page</h1>
                {cartItems.length === 0 ? 
                (<p style={{ color: "#1D3557", fontSize: "20px" }}>Your Cart is empty</p>) : 
                ( <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key = {item.id}>
                                <span>{item.name} - ${item.price} x {item.quantity}</span>
                                <button onClick={() => removeItem(item.id)}
                                style={{
                            marginTop: "20px",
                            padding: "10px 14px",
                            backgroundColor: "#E63946",
                            color: "#F1FAEE",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600",
                            marginRight: "10px"
                        }} >Remove</button>
                                
                            </li>
                        )
                        )}
                    </ul>
                    <p style = {{color: "#1D3557", fontSize: "24px", fontWeight: "bold"}}>Total: {total}</p>
                    <button onClick={() => navigate("/CheckoutPage")}
                     style={{
                            marginTop: "20px",
                            padding: "10px 14px",
                            backgroundColor: "#E63946",
                            color: "#F1FAEE",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600",
                            marginRight: "10px"
                        }} >Checkout</button>
                </div> )}

            </div>
        </div>
    )
}

export default CartPage;