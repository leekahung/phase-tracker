import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);
