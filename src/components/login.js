import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase.config";

export function Login({ setIsSignedIn }) {
  const [value, setValue] = useState("");

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setValue(result.user.email);
        localStorage.setItem("email", result.user.email);
        setIsSignedIn(true); // Update the signed-in state
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setValue(userEmail);
  }, []);

  return (
    <div className="container">
      <h1>Hey Stranger :)</h1>
      <h2 className="login">Log in to your account</h2>
      <div className="google-btn">
        <button className="signin-btn" onClick={handleClick}>
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
