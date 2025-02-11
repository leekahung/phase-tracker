import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import Member from "./pages/Member/Member";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/member/:memberHandle",
        element: <Member />,
      },
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);
