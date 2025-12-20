import React, { useState, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';

function BrowsePage() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/products")   
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
      
            <div style={{ background: "#F1FAEE", padding: "30px", minHeight: "100vh", fontFamily: "sans-serif" }}>

                <h1 style={{ color: "#1D3557", fontSize: "26px", fontWeight: "bold" }}>
                    Browse Marketplace
                </h1>
                <p style={{ color: "#457B9D" }}>
                    Discover unique items from trusted sellers
                </p>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search for items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        margin: "20px 0",
                        background: "#FFFFFF"
                    }}
                />

                {/* Status */}
                {loading && <p>Loading products...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <div style={{ display: "flex", gap: "20px" }}>

                        {/* Filters (UI only) */}
                        <div style={{
                            width: "250px",
                            background: "#FFFFFF",
                            padding: "20px",
                            borderRadius: "10px"
                        }}>
                            <h3 style={{ color: "#1D3557" }}>Filters</h3>

                            <p style={{ marginTop: "15px", fontWeight: "600" }}>Categories</p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                <li>All Categories</li>
                                <li>Electronics</li>
                                <li>Fashion</li>
                                <li>Home & Garden</li>
                                <li>Sports & Outdoors</li>
                                <li>Books & Media</li>
                            </ul>

                            <p style={{ marginTop: "15px", fontWeight: "600" }}>Condition</p>
                            <label><input type="checkbox" /> New</label><br />
                            <label><input type="checkbox" /> Like New</label><br />
                            <label><input type="checkbox" /> Good</label><br />
                            <label><input type="checkbox" /> Fair</label>
                        </div>

                        {/* Products */}
                        <div style={{ flex: 1 }}>
                            <p style={{ marginBottom: "10px", color: "#457B9D" }}>
                                {products.length} products found
                            </p>

                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                                gap: "20px"
                            }}>
                                {products
                                    .filter(p =>
                                        p.name?.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map(product => (
                                        <div key={product.id} style={{
                                            background: "#FFFFFF",
                                            borderRadius: "10px",
                                            overflow: "hidden"
                                        }}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{
                                                    width: "100%",
                                                    height: "180px",
                                                    objectFit: "cover"
                                                }}
                                            />

                                            <div style={{ padding: "15px" }}>
                                                <h4 style={{ color: "#1D3557" }}>{product.name}</h4>
                                                <p style={{ color: "#E63946", fontWeight: "bold" }}>
                                                    ${product.price}
                                                </p>
                                                <p style={{ fontSize: "12px", color: "#457B9D" }}>
                                                    {product.seller} • ⭐ {product.rating}
                                                </p>

                                                <button style={{
                                                    marginTop: "10px",
                                                    width: "100%",
                                                    padding: "10px",
                                                    background: "#457B9D",
                                                    color: "#F1FAEE",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontWeight: "600"
                                                }}>
                                                    Place Order
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                    </div>
                )}
            </div>
     
    );
}

export default BrowsePage;
