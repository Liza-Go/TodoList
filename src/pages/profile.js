import React from "react";
import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";

export function Profile() {
  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="profile">
      <h2>{user.displayName}'s Profile</h2>
      <div className="profile-card todo-card profile-details">
        <p>Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className="signout-btn">
        <button className="signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
