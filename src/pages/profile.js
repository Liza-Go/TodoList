import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export function Profile() {
  // const user = auth.currentUser;
  const [user, setUser] = useState(auth.currentUser);
  const [isSignedOut, setIsSignedOut] = useState(false);

  const displayName = user.displayName;
  const email = user.email;
  // const photoURL = user.photoURL;
  // const uid = user.uid;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsSignedOut(true);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  if (isSignedOut) {
    return <Navigate to="/" />;
  }

  return (
    <div className="profile">
      <h2> Profile</h2>
      <div className="profile-card todo-card profile-details">
        {user && <p>Name: {displayName}</p>}
        {user && <p>Email: {email}</p>}
      </div>
      <div className="signout-btn">
        <button className="signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
