import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/manager" className="nav-link">
        Manager
      </Link>
      <Link to="/investors" className="nav-link">
        Investors
      </Link>
    </nav>
  );
}

export default Navbar;
