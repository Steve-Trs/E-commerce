import React, { useState } from "react";
import "../styles/register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const message = await response.text();
        alert(message);
        window.location.href = "/";
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (err) {
      alert("Registration failed...!", err);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2 className="register-title">Create an account</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="button" onClick={handleClick}>
          Register
        </button>
      </form>
    </div>
  );
}
