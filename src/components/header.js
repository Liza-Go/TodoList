import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase.config";

export function Header() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          {user && (
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
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
