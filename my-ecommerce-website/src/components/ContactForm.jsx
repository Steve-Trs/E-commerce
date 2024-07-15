import React, { useState } from "react";
import "../styles/contactform.css";

export default function ContactForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", {
      firstname,
      lastname,
      email,
      phone,
      message,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h3>Have a question?</h3>
      <div className="form-group">
        <label htmlFor="firstname">Firstname:</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastname">Lastname:</label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </div>

      <button type="submit" className="button">
        Send
      </button>
    </form>
  );
}
