import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductList from "../Components/My Products/ProductList.jsx";
import "../Components/My Products/MyProducts.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/api/listings`);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);

      const data = await res.json();

      const mapped = (Array.isArray(data) ? data : []).map((p) => ({
        ...p,
        id: p._id,
        name: p.title,
        category: p.category || "General",
        orders: p.orders ?? 0,
        views: p.views ?? 0,
        active: p.status ? String(p.status).toLowerCase() === "active" : true,
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

  const handleDelete = async (id) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_URL}/api/listings/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (e) {
      alert(e.message || "Failed to delete");
    }
  };

  const handleToggleActive = async (id, nextActive) => {
  // 1) Optimistic update (instant UI change)
  setProducts((prev) =>
    prev.map((p) =>
      (p._id || p.id) === id
        ? { ...p, active: nextActive, status: nextActive ? "Active" : "Inactive" }
        : p
    )
  );

  try {
    const res = await fetch(`${API_URL}/api/listings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextActive ? "Active" : "Inactive" }),
    });

    // 2) If backend fails -> revert
    if (!res.ok) {
      let errMsg = `Update failed: ${res.status}`;
      try {
        const err = await res.json();
        errMsg = err.message || err.error || errMsg;
      } catch {}
      throw new Error(errMsg);
    }

    const data = await res.json();

    // 3) Support both response shapes:
    //    - returns listing directly
    //    - returns { listing: updatedListing }
    const updated = data?.listing ?? data;

    setProducts((prev) =>
      prev.map((p) =>
        (p._id || p.id) === id
          ? {
              ...p,
              status: updated.status ?? (nextActive ? "Active" : "Inactive"),
              active: String(updated.status ?? (nextActive ? "Active" : "Inactive")).toLowerCase() === "active",
            }
          : p
      )
    );
  } catch (e) {
    // Revert the optimistic UI change
    setProducts((prev) =>
      prev.map((p) =>
        (p._id || p.id) === id
          ? { ...p, active: !nextActive, status: !nextActive ? "Active" : "Inactive" }
          : p
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
          + Add Listing
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
