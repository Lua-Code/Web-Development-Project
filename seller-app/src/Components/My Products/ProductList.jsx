import ProductCard from "./ProductCard.jsx";
import "../My Products/MyProducts.css";


export default function ProductList({ products, onDelete, onToggleActive }) {
  return (
    <div className="products-list">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onDelete={onDelete}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}

