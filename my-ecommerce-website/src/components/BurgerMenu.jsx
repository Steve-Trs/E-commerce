import React from "react";
import "../styles/burgermenu.css";

export default function BurgerMenu({ onClick, isOpen }) {
  return (
    <>
      <div
        className={`burger-menu ${isOpen ? "active" : ""}`}
        onClick={onClick}
      >
        <div className="line l1"></div>
        <div className="line l2"></div>
        <div className="line l3"></div>
      </div>
    </>
  );
}
