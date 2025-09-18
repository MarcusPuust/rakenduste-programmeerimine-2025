import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import New from "./components/New";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // http://localhost:5173/#/
      { path: "about", element: <About /> }, // http://localhost:5173/#/about
      { path: "new", element: <New /> }, // http://localhost:5173/#/new
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
