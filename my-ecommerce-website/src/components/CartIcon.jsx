import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function CartIcon({ cartItems }) {
  return (
    <NavLink to="/checkout" className="shopping-cart">
      <FontAwesomeIcon icon={faShoppingCart} />
      {cartItems.length > 0 && (
        <span className="cart-count">{cartItems.length}</span>
      )}
    </NavLink>
  );
}
