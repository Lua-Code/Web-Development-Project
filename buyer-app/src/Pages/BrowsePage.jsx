import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function BrowsePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [placingOrder, setPlacingOrder] = useState(false);

    const conditionOptions = ["new", "used", "refurbished"];

    // Fetch products & categories
    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                setLoading(true);
                setError(null);

                const [resProducts, resCategories] = await Promise.all([
                    fetch(`${API_URL}/api/listings/browse`, { credentials: "include" }),
                    fetch(`${API_URL}/api/categories`, { credentials: "include" }),
                ]);

                if (!resProducts.ok) throw new Error("Failed to fetch products");
                if (!resCategories.ok) throw new Error("Failed to fetch categories");

                const dataProducts = await resProducts.json();
                const dataCategories = await resCategories.json();

                setProducts(dataProducts);
                setCategories([{ _id: "all", name: "All Categories" }, ...dataCategories]);
            } catch (err) {
                setError(err.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    // Filter products
    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
        const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(p.condition);
        return matchesSearch && matchesCategory && matchesCondition;
    });

    const addToCart = async (productId, quantity = 1) => {
        try {
            const res = await fetch(`${API_URL}/api/cart`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to add to cart");
            }

            alert("Added to cart!");
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };


    return (
        <div style={{ background: "#F1FAEE", minHeight: "100vh", padding: "30px", fontFamily: "system-ui, sans-serif" }}>
            <h1 style={{ color: "#1D3557", fontSize: "28px", fontWeight: "800" }}>Browse Marketplace</h1>

            {/* Search */}
            <input
                type="text"
                placeholder="Search for items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid #ddd", marginBottom: "30px", fontSize: "15px" }}
            />

            {loading && <p>Loading products…</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                    {/* Filters */}
                    <aside style={{ width: "260px", background: "#FFFFFF", padding: "20px", borderRadius: "16px", boxShadow: "0 12px 30px rgba(0,0,0,0.06)", position: "sticky", top: "20px" }}>
                        <h3 style={{ color: "#1D3557", fontSize: "18px", fontWeight: "700", marginBottom: "18px" }}>Filters</h3>
                        <div style={{ marginBottom: "24px" }}>
                            <p style={{ fontWeight: "600", marginBottom: "10px", color: "#1D3557" }}>Categories</p>
                            {categories.map((cat) => (
                                <div
                                    key={cat._id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        marginBottom: "6px",
                                        background: selectedCategory === cat.name ? "#457B9D" : "transparent",
                                        color: selectedCategory === cat.name ? "#F1FAEE" : "#457B9D",
                                    }}
                                >
                                    {cat.name}
                                </div>
                            ))}
                        </div>

                        {/* Conditions */}
                        <div>
                            <p style={{ fontWeight: "600", marginBottom: "10px", color: "#1D3557" }}>Condition</p>
                            {conditionOptions.map((c) => (
                                <label key={c} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: selectedConditions.includes(c) ? "#F1FAEE" : "#457B9D", background: selectedConditions.includes(c) ? "#457B9D" : "transparent", padding: "4px 8px", borderRadius: "8px", marginBottom: "6px", cursor: "pointer" }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedConditions.includes(c)}
                                        onChange={() => {
                                            if (selectedConditions.includes(c)) {
                                                setSelectedConditions(selectedConditions.filter(cond => cond !== c));
                                            } else {
                                                setSelectedConditions([...selectedConditions, c]);
                                            }
                                        }}
                                    />
                                    {c}
                                </label>
                            ))}
                        </div>
                    </aside>

                    {/* Products */}
                    <main style={{ flex: 1 }}>
                        <p style={{ marginBottom: "14px", color: "#457B9D", fontSize: "14px" }}>{filteredProducts.length} products found</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
                            {filteredProducts.map((product) => (
                                <div key={product._id} style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.06)" }}>
                                    <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                                    <div style={{ padding: "14px" }}>
                                        <h4 style={{ color: "#1D3557", fontSize: "16px", fontWeight: "700", marginBottom: "6px" }}>{product.name}</h4>
                                        <p style={{ color: "#E63946", fontWeight: "800", marginBottom: "6px" }}>${product.price}</p>
                                        <p style={{ fontSize: "12px", color: "#457B9D", marginBottom: "10px" }}>{product.seller} • ⭐ {product.rating}</p>
                                        <button
                                            onClick={() => addToCart(product._id)}
                                            disabled={placingOrder}
                                            style={{ width: "100%", padding: "10px", background: "#457B9D", color: "#F1FAEE", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}
                                        >
                                            {placingOrder ? "Placing…" : "Place Order"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}

export default BrowsePage;
