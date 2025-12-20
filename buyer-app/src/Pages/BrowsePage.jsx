import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function BrowsePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch products
        const resProducts = await fetch(`http://localhost:5000/api/listings/browse`, { credentials: "include" });
        if (!resProducts.ok) throw new Error(`Failed to fetch products: ${resProducts.status}`);
        const dataProducts = await resProducts.json();

        // Fetch categories
        const resCategories = await fetch(`http://localhost:5000/api/categories`, { credentials: "include" });
        if (!resCategories.ok) throw new Error(`Failed to fetch categories: ${resCategories.status}`);
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

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ background: "#F1FAEE", minHeight: "100vh", padding: "30px", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ color: "#1D3557", fontSize: "28px", fontWeight: "800" }}>Browse Marketplace</h1>
        <p style={{ color: "#457B9D", marginTop: "6px" }}>Discover unique items from trusted sellers</p>
      </div>

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

            {/* Categories */}
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
                    transition: "all 0.2s",
                  }}
                >
                  {cat.name}
                </div>
              ))}
            </div>

            {/* Condition (UI only) */}
            <div>
              <p style={{ fontWeight: "600", marginBottom: "10px", color: "#1D3557" }}>Condition</p>
              {["New", "Like New", "Good", "Fair"].map((c) => (
                <label key={c} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#457B9D", marginBottom: "8px", cursor: "pointer" }}>
                  <input type="checkbox" />
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
                <div key={product._id} style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.06)", transition: "transform 0.2s" }}
                     onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                     onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                  <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                  <div style={{ padding: "14px" }}>
                    <h4 style={{ color: "#1D3557", fontSize: "16px", fontWeight: "700", marginBottom: "6px" }}>{product.name}</h4>
                    <p style={{ color: "#E63946", fontWeight: "800", marginBottom: "6px" }}>${product.price}</p>
                    <p style={{ fontSize: "12px", color: "#457B9D", marginBottom: "10px" }}>{product.seller} • ⭐ {product.rating}</p>
                    <button style={{ width: "100%", padding: "10px", background: "#457B9D", color: "#F1FAEE", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}>Add To Cart</button>
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
