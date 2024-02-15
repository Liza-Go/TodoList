import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/list">
                Todo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
