import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductMainInfo from "../Components/ProductMainInfo";
import ProductDescription from "../Components/ProductDescription";
import ProductGallery from "../Components/ProductGallery";
import "../App.css"

const ProductPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/${id}`); // Adjust port if needed
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProductData(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading product...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;
  if (!productData) return <div className="p-10 text-center">Product not found.</div>;

  // Map backend data to component props
  const productInfo = {
    name: productData.title,
    rating: productData.seller.rating,
    price: `$${productData.price}`, // formatting
    category: "General", // The backend ID isn't a name yet, need to fetch category or just use static for now if populate isn't deep enough or just skip
    instock: productData.stock > 0,
  };

  const images = productData.images || [];

  // Construct specs from available data
  const specs = {
    Condition: productData.condition || "N/A",
    Stock: productData.stock,
    Seller: productData.seller.name,
  };

  return (
    <div className="product-page">
      <ProductGallery images={images} />

      <div className="product-info-column">
        <ProductMainInfo product={productInfo} />
      </div>

      <ProductDescription descr={productData.description} specs={specs} />
    </div>
  );
}

export default ProductPage;
