import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

import BurgerMenu from "./BurgerMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import LoginRegisterWindow from "./LoginRegisterWindow";
import CartIcon from "./CartIcon";

const NavLinks = [
  { title: "Home", link: "/" },
  { title: "Programs", link: "/programs" },
  { title: "Shop", link: "/shop" },
  { title: "Contact", link: "/contact" },
];

export default function Navbar({ isLoggedIn, onLogout, cartItems }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginRegisterWindowOpen, setIsLoginRegisterWindowOpen] =
    useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const searchBarRef = useRef(null);
  const loginRegisterRef = useRef(null);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleMobileMenuLinkClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleRegisterIconClick = () => {
    setIsLoginRegisterWindowOpen(!isLoginRegisterWindowOpen);
  };

  const handleSearchIconClick = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsSearchBarOpen(false);
    }
    if (
      loginRegisterRef.current &&
      !loginRegisterRef.current.contains(event.target)
    ) {
      setIsLoginRegisterWindowOpen(false);
    }
  };

  // Close the search bar and login/register window when clicking outside of them
  useEffect(() => {
    if (isSearchBarOpen || isLoginRegisterWindowOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchBarOpen, isLoginRegisterWindowOpen]);

  // Close the search bar when navigating to a new route
  useEffect(() => {
    setIsSearchBarOpen(false);
  }, [location]);

  return (
    <>
      <nav>
        <div className="logo">
          <img src="" alt="logo" />
          <span>my brand</span>
        </div>
        <div className="navlinks">
          {NavLinks.map((link, index) => (
            <NavLink
              to={link.link}
              key={index}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
        <div className="icons">
          <FontAwesomeIcon
            icon={faUser}
            style={{ marginRight: 20 }}
            className="register"
            onClick={handleRegisterIconClick}
          />
          {isLoginRegisterWindowOpen && (
            <div ref={loginRegisterRef} className="login-register-window">
              <LoginRegisterWindow
                onClose={handleRegisterIconClick}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
              />
            </div>
          )}
          <CartIcon cartItems={cartItems} />
          <FontAwesomeIcon
            icon={faSearch}
            className="search"
            onClick={handleSearchIconClick}
          />
          {isSearchBarOpen && (
            <div ref={searchBarRef}>
              <SearchBar />
            </div>
          )}
        </div>
        <BurgerMenu onClick={toggleNav} isOpen={isNavOpen} />
        <MobileMenu
          isOpen={isNavOpen}
          onLinkClick={handleMobileMenuLinkClick}
        />
      </nav>
    </>
  );
}
