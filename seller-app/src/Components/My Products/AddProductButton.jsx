import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProducts.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    active: true,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!newProduct.name.trim()) errs.name = "Name is required";
    if (!newProduct.category.trim()) errs.category = "Category is required";
    if (!newProduct.description.trim()) errs.description = "Description is required";
    if (!newProduct.price || Number(newProduct.price) <= 0) errs.price = "Price must be a positive number";
    if (!newProduct.stock || Number(newProduct.stock) < 0) errs.stock = "Stock cannot be negative";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      title: newProduct.name,
      description: newProduct.description,
      category: newProduct.category,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      images: [], // placeholder for now
    };

    try {
      const res = await fetch(`${API_URL}/api/listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Failed: ${res.status}`);

      navigate("/myproducts");
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
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.category && <p className="error-text">{errors.category}</p>}

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.description && <p className="error-text">{errors.description}</p>}

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.price && <p className="error-text">{errors.price}</p>}

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.stock && <p className="error-text">{errors.stock}</p>}

          <button type="submit" className="form-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
