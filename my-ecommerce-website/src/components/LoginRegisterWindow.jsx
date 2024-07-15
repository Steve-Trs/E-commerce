import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginregisterwindow.css";

const LoginRegisterWindow = ({ onClose, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
    onClose();
  };

  const handleRegisterClick = () => {
    navigate("/register");
    onClose();
  };

  return (
    <>
      <h2>Login or Register</h2>
      <p>
        {isLoggedIn ? (
          <>
            <span>
              <b>(username)</b>
            </span>
            <br />
            <a className="logout" onClick={onLogout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <span>
              {" "}
              Already have an account? <a onClick={handleLoginClick}>
                Login
              </a>{" "}
            </span>
            <br />
            <br />
            <span>
              Not registered yet?{" "}
              <a onClick={handleRegisterClick}>Create an account</a>
            </span>
          </>
        )}
      </p>
    </>
  );
};

export default LoginRegisterWindow;
