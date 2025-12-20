import ProductCard from "./ProductCard.jsx";
import "../My Products/MyProducts.css";


export default function ProductList({ products, onDelete, onToggleActive }) {
  console.log("Rendering ProductList with products:", products);
  return (
    <div className="products-list">
      {products.map((p) => (
        <ProductCard
          key={p._id}          
          product={p}
          onDelete={onDelete}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}


