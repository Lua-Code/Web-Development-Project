import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductList from "../Components/My Products/ProductList.jsx";
import "../Components/My Products/MyProducts.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load current user's listings
  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/api/listings/me`, {
        credentials: "include", // session-based
      });

      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);

      const data = await res.json();

      const mapped = (Array.isArray(data) ? data : []).map((p) => ({
        ...p,
        _id: p._id, // keep original Mongo ID
        name: p.title,
        category: p.category || "General",
        orders: p.orders ?? 0,
        views: p.views ?? 0,
        active: String(p.status ?? "Active").toLowerCase() === "active",
        image: Array.isArray(p.images) && p.images.length ? p.images[0] : null,
      }));

      setProducts(mapped);
    } catch (e) {
      setError(e.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (_id) => {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/listings/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      setProducts((prev) => prev.filter((p) => p._id !== _id));
    } catch (e) {
      alert(e.message || "Failed to delete");
    }
  };

  const handleToggleActive = async (_id, nextActive) => {
    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) =>
        p._id === _id ? { ...p, active: nextActive, status: nextActive ? "Active" : "Inactive" } : p
      )
    );

    try {
      console.log("Toggling active status for", _id, "to", nextActive);
      const res = await fetch(`${API_URL}/api/listings/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: nextActive ? "Active" : "Inactive" }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Update failed: ${res.status}`);
      }

      const updated = (await res.json())?.listing ?? (await res.json());

      setProducts((prev) =>
        prev.map((p) =>
          p._id === _id
            ? {
                ...p,
                status: updated.status ?? (nextActive ? "Active" : "Inactive"),
                active: String(updated.status ?? (nextActive ? "Active" : "Inactive")).toLowerCase() === "active",
              }
            : p
        )
      );
    } catch (e) {
      // Revert UI
      setProducts((prev) =>
        prev.map((p) =>
          p._id === _id ? { ...p, active: !nextActive, status: !nextActive ? "Active" : "Inactive" } : p
        )
      );
      alert(e.message || "Failed to update status");
    }
  };

  if (loading) return <div>Loading…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="products-page">
      <div className="products-header">
        <h2 className="products-title">My Products</h2>
        <Link to="/add-listing" className="btn-add">
          + Add Listing Meow ;3
        </Link>
      </div>

      <ProductList
        products={products}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
}
