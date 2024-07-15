import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="social">
          <img src="" alt="facebook icon" />
          <img src="" alt="instagram icon" />
        </div>
        <div className="copyright">
          &copy; 2024 "my brand". All rights reserved.
        </div>
        <div className="legal">
          <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a> |{" "}
          <a href="#">F.A.Q.</a>
        </div>
      </footer>
    </>
  );
}
