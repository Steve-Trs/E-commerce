import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PurchaseOptions from "../components/PurchaseOptions";
import "../styles/pageproduct.css";

export default function PageProduct({ onAddToCart }) {
  const params = useParams();
  const productId = params.id;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      }
    }
    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = (product) => {
    onAddToCart(product);
    navigate("/checkout");
  };

  const isManOrWomanCategory =
    product.category === "man" || product.category === "woman";
  return (
    <>
      <section className="product-page">
        <div className="product-container">
          <img
            src={product.image_url}
            alt="product image"
            className="product-image"
          />
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
        </div>
        <div className="purchase-options">
          <PurchaseOptions product={product} onAddToCart={handleAddToCart} />
        </div>
      </section>
    </>
  );
}
