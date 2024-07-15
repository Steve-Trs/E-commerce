import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/shop.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Shop({ onAddToCart }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState({});

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

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setButtonText((prevText) => ({ ...prevText, [product.id]: "Added" }));
    setTimeout(() => {
      setButtonText((prevText) => ({
        ...prevText,
        [product.id]: "Add to Cart",
      }));
    }, 1000);
  };

  const programsProducts = products.filter(
    (product) => product.category === "programs"
  );
  const manProducts = products.filter((product) => product.category === "man");
  const womanProducts = products.filter(
    (product) => product.category === "woman"
  );

  return (
    <>
      <section className="categories">
        <div className="categories-container">
          <div className="category prog">
            <h2>Training Plans</h2>
            <Carousel responsive={responsive}>
              {programsProducts.map((product) => (
                <div key={product.id} className="card">
                  <NavLink to={`/product/${product.id}`} className="prod-link">
                    <img
                      src={product.image_url}
                      alt="product image"
                      className="product-image"
                    />
                    <h3>{product.title}</h3>
                    <p className="price">${product.price}</p>
                    <p>{product.description}</p>
                  </NavLink>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    {buttonText[product.id] || "Add to Cart"}
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="category female">
            <h2>Female T-Shirt</h2>
            <Carousel responsive={responsive}>
              {womanProducts.map((product) => (
                <div key={product.id} className="card">
                  <NavLink to={`/product/${product.id}`} className="prod-link">
                    <img
                      src={product.image_url}
                      alt="product image"
                      className="product-image"
                    />
                    <h3>{product.title}</h3>
                    <p className="price">${product.price}</p>
                    <p>{product.description}</p>
                  </NavLink>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    {buttonText[product.id] || "Add to Cart"}
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="category male">
            <h2>Male T-Shirt</h2>
            <Carousel responsive={responsive}>
              {manProducts.map((product) => (
                <div key={product.id} className="card">
                  <NavLink to={`/product/${product.id}`} className="prod-link">
                    <img
                      src={product.image_url}
                      alt="product image"
                      className="product-image"
                    />
                    <h3>{product.title}</h3>
                    <p className="price">${product.price}</p>
                    <p>{product.description}</p>
                  </NavLink>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    {buttonText[product.id] || "Add to Cart"}
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}
