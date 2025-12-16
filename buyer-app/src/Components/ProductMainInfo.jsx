import RatingStars from "../Components/RatingStars";

const ProductMainInfo = ({ product }) => {
  return (
    <div className="product-info">
      <h1 className="product-title">{product.name}</h1>

      <div className="product-rating">
         <RatingStars rating={product.rating} />
        <span className="rating-value">{product.rating} / 5</span>
      </div>

      <p className="product-price">{product.price}</p>

      <p className="product-category">
        <span>Category</span>: {product.category}
      </p>

      <p className={`product-stock ${product.instock ? "in" : "out"}`}>
        {product.instock ? "In stock" : "Out of stock"}
      </p>

    </div>
  );
};

export default ProductMainInfo;
