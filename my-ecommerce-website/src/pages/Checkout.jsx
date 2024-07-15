import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ShoppingCart from "../components/ShoppingCart";
import CheckoutForm from "../components/CheckoutForm";
import "../styles/checkout.css";

// Load your publishable key from the Stripe dashboard
const stripePromise = loadStripe("your-publishable-key-here");

export default function Checkout({
  cartItems,
  onRemoveFromCart,
  onUpdateCartItem,
}) {
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price || 0),
    0
  );

  return (
    <div className="checkout-container">
      <div className="checkout-recap">
        <ShoppingCart
          cartItems={cartItems}
          onRemoveFromCart={onRemoveFromCart}
          onUpdateCartItem={onUpdateCartItem}
        />

        {totalItems > 0 && (
          <div className="summary">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
        )}

        {totalItems > 0 && (
          <Elements stripe={stripePromise}>
            <CheckoutForm cartItems={cartItems} />
          </Elements>
        )}
      </div>
    </div>
  );
}
