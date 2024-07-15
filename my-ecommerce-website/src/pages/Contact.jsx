import React from "react";
import ContactForm from "../components/ContactForm";
import "../styles/contact.css";

export default function Contact() {
  return (
    <>
      <section className="contact">
        <div className="info">
          <h2>Contact Us</h2>
          <div className="content-contact">
            <span className="label">
              <b>Email:</b>
            </span>
            <span>your@email.gmail.com</span>
            <span className="label">
              <b>Tel:</b>
            </span>
            <span>+XX XXXXXXXXX</span>
            <span className="label">
              <b>Address:</b>
            </span>
            <span>
              12 Calle Don Juan Manuel
              <br />
              Torremolinos, 29620, Malaga
            </span>
          </div>
        </div>
        <div className="form-container">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
