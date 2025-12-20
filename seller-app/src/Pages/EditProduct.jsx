import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Components/My Products/MyProducts.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");

        const res = await fetch(`${API_URL}/api/listings/${id}`, {
          credentials: "include", // ✅ session auth
        });

        if (res.status === 401 || res.status === 403) {
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error(`Failed to load: ${res.status}`);

        const data = await res.json();

        setProduct({
          _id: data._id,
          name: data.title ?? "",
          description: data.description ?? "",
          price: data.price ?? 0,
          stock: data.stock ?? 0,
          condition: data.condition ?? "new",
          status: data.status ?? "active", // lowercase
        });
      } catch (e) {
        setError(e.message || "Failed to load product");
      }
    };

    load();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        condition: product.condition,
        status: product.status.toLowerCase(), // ✅ enum safe
      };

      const res = await fetch(`${API_URL}/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ REQUIRED
        body: JSON.stringify(payload),
      });

      if (res.status === 401 || res.status === 403) {
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(`Update failed: ${res.status} ${msg}`);
      }

      navigate("/myproducts");
    } catch (e) {
      setError(e.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (!product) {
    return <div>{error ? <span style={{ color: "red" }}>{error}</span> : "Loading…"}</div>;
  }

  return (
    <div className="edit-product-page">
      <h2>Edit Product</h2>

      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

      <form onSubmit={handleSubmit} className="edit-product-form">
        <label>
          Product Name
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </label>

        <label>
          Description
          <input type="text" name="description" value={product.description} onChange={handleChange} required />
        </label>

        <label>
          Price
          <input type="number" name="price" min="0" step="0.01" value={product.price} onChange={handleChange} required />
        </label>

        <label>
          Stock
          <input type="number" name="stock" min="0" value={product.stock} onChange={handleChange} />
        </label>

        <label>
          Condition
          <select name="condition" value={product.condition} onChange={handleChange}>
            <option value="new">new</option>
            <option value="used">used</option>
            <option value="refurbished">refurbished</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" value={product.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
