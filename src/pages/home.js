import { Login } from "../components/login";
import { SignIn } from "../firebase/signIn";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div>
      {!isSignedIn ? (
        <Login setIsSignedIn={setIsSignedIn} setValue={setValue} />
      ) : (
        <SignIn setIsSignedIn={setIsSignedIn} value={value} />
      )}
      {isSignedIn && <Navigate to="/list" />}
    </div>
  );
}
