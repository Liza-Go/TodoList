import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "./App";
import { List } from "./pages/list";
import { Profile } from "./pages/profile";
import { Login } from "./pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/list" />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
