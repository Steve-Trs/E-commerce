import React from "react";
import "../styles/shoppingcart.css";

export default function ShoppingCart({
  cartItems,
  onRemoveFromCart,
  onUpdateCartItem,
}) {
  const handleSizeChange = (instanceId, newSize) => {
    onUpdateCartItem(instanceId, { size: newSize });
  };

  return (
    <>
      <div className="shopping-cart-container">
        {cartItems.length === 0 ? (
          <div className="cart-container">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="cart-container">
            <ul>
              {cartItems.map((item) => (
                <li key={item.instanceId} className="cart-item">
                  <div className="item-desc">
                    <div className="pic">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="item-img"
                      />
                    </div>
                    <h4>{item.title}</h4>
                  </div>
                  <div className="item-content">
                    <span className="item-price">${item.price}</span>
                    {item.category === "man" || item.category === "woman" ? (
                      <div>
                        <label>
                          Size:&nbsp;
                          <select
                            value={item.size}
                            onChange={(e) =>
                              handleSizeChange(item.instanceId, e.target.value)
                            }
                          >
                            <option value="XS">Extra Small</option>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">Extra Large</option>
                          </select>
                        </label>
                      </div>
                    ) : null}
                    <button onClick={() => onRemoveFromCart(item.instanceId)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
