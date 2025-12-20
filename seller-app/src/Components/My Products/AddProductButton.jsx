import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProducts.css";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    sellerId: "",
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    orders: 0,
    views: 0,
    active: true,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      sellerId: newProduct.sellerId,
      title: newProduct.name,
      description: newProduct.description,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      status: newProduct.active ? "Active" : "Inactive",
      images:[],
    };

    try {
      const res = await fetch(`${API_URL}/api/listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || `Failed: ${res.status}`);
      }

      navigate("/Myproducts");
    } catch (err) {
      alert(err.message || "Failed to add product");
    }
  };

  return (
  <div className="products-page">
    <div className="products-header">
      <h2 className="products-title">Add New Product</h2>
    </div>

    <div className="add-product-card">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="sellerId"
          placeholder="Seller ID (Mongo ObjectId)"
          value={newProduct.sellerId}
          onChange={handleInputChange}
          required
          className="form-input"
        />

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
          className="form-input"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
          required
          className="form-input"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
          className="form-input"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
          className="form-input"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleInputChange}
          required
          className="form-input"
        />

        <label className="form-checkbox">
          <input
            type="checkbox"
            name="active"
            checked={newProduct.active}
            onChange={handleInputChange}
          />
          Active
        </label>

        <button type="submit" className="form-btn">
          Add Product
        </button>
      </form>
    </div>
  </div>
);

}

export default AddProduct;
