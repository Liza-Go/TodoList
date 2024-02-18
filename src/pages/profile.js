import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";
import { useAuth } from "../providers/authProvider";

export function Profile() {
  const user = useAuth();
  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <div className="profile">
      <h2> Profile</h2>
      <div className="profile-card todo-card profile-details">
        {user && <p>Name: {user.displayName}</p>}
        {user && <p>Email: {user.email}</p>}
      </div>
      <div className="signout-btn">
        <button className="signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
