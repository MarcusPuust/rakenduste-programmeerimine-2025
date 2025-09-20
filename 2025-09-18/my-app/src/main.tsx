import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "new", element: <New /> },
    ],
  },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f8122ff",
    },
    secondary: {
      main: "#52864cff",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* ühtlane reset MUI poolt */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
