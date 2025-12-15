import { useParams } from "react-router-dom";
import ProductMainInfo from "../Components/ProductMainInfo";
import ProductDescription from "../Components/ProductDescription";
import ProductGallery from "../Components/ProductGallery";
import "../App.css"

const ProductPage = () => {
  const { id } = useParams();

  // temp product data 
  const product = {
    name: "iPhone 15",
    rating: 4,
    price: "$999",
    category: "Smartphones",
    instock: true,
  };

  const description =
    "The iPhone 15 features a powerful A17 chip, improved camera, and longer battery life.";

  const specs = {
    Storage: "256GB",
    Color: "Black",
    Battery: "4500mAh",
    Weight: "171g",
  };


  const images = [
  "https://via.placeholder.com/200",
];

  return (
  <div className="product-page">
  <ProductGallery images={images} />

  <div className="product-info-column">
    <ProductMainInfo product={product} />

  </div>

  <ProductDescription descr={description} specs={specs} />

</div>
  )
}

export default ProductPage;
