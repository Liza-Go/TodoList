import React from "react";
import { Login } from "../components/login";
import { List } from "../pages/list";

export function SignIn({ setIsSignedIn, value }) {
  return (
    <div>{value ? <List /> : <Login setIsSignedIn={setIsSignedIn} />}</div>
  );
}
