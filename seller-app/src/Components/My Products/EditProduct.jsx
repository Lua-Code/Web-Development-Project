import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../My Products/MyProducts.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load from DB
  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const res = await fetch(`${API_URL}/api/listings/${id}`);
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`);

        const data = await res.json();

        // Map DB -> form fields
        setProduct({
          _id: data._id,
          name: data.title ?? "",
          category: data.category ?? "", // optional for now
          description: data.description ?? "",
          price: data.price ?? 0,
          stock: data.stock ?? 0,
          condition: data.condition ?? "new",
          status: data.status ?? "Active",
        });
      } catch (e) {
        setError(e.message || "Failed to load product");
      }
    };

    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  // ✅ Save to DB (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    try {
      setSaving(true);
      setError("");

      // Map form -> DB fields
      const payload = {
        title: product.name,
        description: product.description,
        price: Number(product.price),
        stock: Number(product.stock),
        condition: product.condition,
        status: product.status,
      };

      const res = await fetch(`${API_URL}/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Update failed: ${res.status} ${txt}`);
      }

      // Go back to products page
      navigate("/MyProducts"); // change to "/my-products" if you switched routes
    } catch (e) {
      setError(e.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (!product) return <div>{error ? <span style={{ color: "red" }}>{error}</span> : "Loading…"}</div>;

  return (
    <div className="edit-product-page">
      <h2>Edit Product</h2>

      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

      <form onSubmit={handleSubmit} className="edit-product-form">
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter Product Name"
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter Product Description"
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter Product Price"
            required
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Condition:</label>
          <select name="condition" value={product.condition} onChange={handleChange}>
            <option value="new">new</option>
            <option value="used">used</option>
            <option value="refurbished">refurbished</option>
          </select>
        </div>

        <div>
          <label>Status:</label>
          <select name="status" value={product.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
