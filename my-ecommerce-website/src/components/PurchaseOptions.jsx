import React, { useState } from "react";

const PurchaseOptions = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const isManOrWomanCategory =
    product.category === "man" || product.category === "woman";
  const isProgramCategory = product.category === "programs";

  const handleAddToCart = () => {
    onAddToCart({ ...product, size: selectedSize, quantity });
  };

  if (isManOrWomanCategory) {
    return (
      <div className="purchase-options">
        <h3>Great Choice!</h3>
        <label>
          Size:&nbsp;
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </label>
        <label>
          Quantity:&nbsp;
          <input
            className="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <button className="buy-now" onClick={handleAddToCart}>
          Purchase Now
        </button>
      </div>
    );
  } else if (isProgramCategory) {
    return (
      <div className="purchase-options">
        <h3>Great choice!</h3>
        <p>
          This program is designed to help you reach your goals effectively and
          sustainably. Stay committed, and you'll soon see the transformation
          you've been working towards. We're excited to be a part of your
          journey!
        </p>
        <button className="buy-now" onClick={handleAddToCart}>
          Purchase Now
        </button>
      </div>
    );
  } else {
    return <div>No purchase options available</div>;
  }
};

export default PurchaseOptions;
