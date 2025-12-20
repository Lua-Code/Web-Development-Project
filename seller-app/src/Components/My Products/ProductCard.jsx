import { Link } from "react-router-dom";
import "../My Products/MyProducts.css";

export default function ProductCard({ product, onDelete, onToggleActive }) {
  return (
    <div className="product-card">
      <div className="product-card-inner">
        <div className="product-thumb" />

        <div className="product-main">
          <div className="product-top">
            <div>
              <h3 className="product-name">{product.name}</h3>

              <div className="product-tags">
                <span className="tag">New</span>
                <span className="tag">{product.category}</span>
              </div>

              <p className="product-desc">{product.description}</p>

              <div className="product-meta">
                <span>
                  <span className="font-semibold text-slate-700">Stock:</span>{" "}
                  {product.stock}
                </span>
                <span>
                  <span className="font-semibold text-slate-700">Orders:</span>{" "}
                  {product.orders}
                </span>
                <span>
                  <span className="font-semibold text-slate-700">Views:</span>{" "}
                  {product.views}
                </span>
              </div>
            </div>

            <div className="price">${Number(product.price).toFixed(2)}</div>
          </div>

          <div className="actions-row">
            <Link to={`/edit-product/${product.id}`} className="btn-edit">
              Edit
            </Link>

            <button className="btn-delete" onClick={() => onDelete(product.id)}>
  Delete
</button>

<button
  type="button"
  className="toggle-wrap"
  onClick={() => onToggleActive(product.id, !product.active)}
>
  <span className="toggle-label">Active</span>

  <span className={`toggle ${product.active ? "bg-emerald-500" : "bg-slate-300"}`}>
    <span className={`toggle-knob ${product.active ? "translate-x-5" : "translate-x-1"}`} />
  </span>
</button>

          </div>
        </div>
      </div>
    </div>
  );
}
