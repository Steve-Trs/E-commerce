import React from "react";
import { useLocation, NavLink } from "react-router-dom";

import "../styles/resultsearch.css";
//
export default function ResultsSearch() {
  const { state } = useLocation();
  const searchResults = state.searchResults;
  if (searchResults.length === 1 && searchResults[0].message) {
    return (
      <>
       
        <h2 className="title-result">Search Results</h2>
        <div className="results-container">
          <p>{searchResults[0].message}</p>
        </div>
    
      </>
    );
  }

  return (
    <>
      <h2 className="title-result">Search Results</h2>
      <div className="results-container">
        {searchResults.map((product) => (
          <div key={product.id} className="card-search">
            <NavLink to={`/product/${product.id}`} className="prod-link">
              <img
                src={product.image_url}
                alt="product image"
                className="product-image-search"
              />
              <h3>{product.title}</h3>
              <p className="price-search">${product.price}</p>
              <p>{product.description}</p>
            </NavLink>
            <button className="add-to-cart">Add to cart</button>
          </div>
        ))}
      </div>
    </>
  );
}
