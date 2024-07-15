import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import Programs from "./pages/Programs";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import PageProduct from "./pages/PageProduct";
import SearchBar from "./components/SearchBar";
import ResultsSearch from "./components/ResultsSearch";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { checkLoginStatus } from "./checkLoginStatus";
import Checkout from "./pages/Checkout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    checkLoginStatus().then((data) => {
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
      }
    });
    // Load cart items from local storage when the component mounts
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();
      if (result.success) {
        setIsLoggedIn(false);
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = (product) => {
    const updatedCartItems = [
      ...cartItems,
      { ...product, instanceId: Date.now() },
    ];
    setCartItems(updatedCartItems);
    // Save cart items to local storage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleRemoveFromCart = (instanceId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.instanceId !== instanceId
    );
    setCartItems(updatedCartItems);
    // Save updated cart items to local storage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleUpdateCartItem = (instanceId, updates) => {
    const updatedCartItems = cartItems.map((item) =>
      item.instanceId === instanceId ? { ...item, ...updates } : item
    );
    setCartItems(updatedCartItems);
    // Save updated cart items to local storage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          cartItems={cartItems}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route
            path="/shop"
            element={
              <Shop setCartItems={setCartItems} onAddToCart={handleAddToCart} />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/product/:id"
            element={
              <PageProduct
                setCartItems={setCartItems}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/search-results" element={<ResultsSearch />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateCartItem={handleUpdateCartItem}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
