import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase.config";

export function Login({ setIsSignedIn }) {
  const [value, setValue] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("name", result.user.email);
        localStorage.setItem("email", result.user.email);
        localStorage.setItem("UId", result.user.uid);
        setValue(result.user.email);
        setIsSignedIn(true); //
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
        <button className="signin-btn" onClick={signInWithGoogle}>
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
