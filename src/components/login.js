import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase.config";

export function Login() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google:", error);
    });
  };

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
