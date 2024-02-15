import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { List } from "./pages/list";
import { Home } from "./pages/home";
import { Profile } from "./pages/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
