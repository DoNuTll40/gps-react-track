import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./contexts/AppContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-tailwind/react";
import { WSContextProvider } from "./contexts/WSContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WSContextProvider>
      <ThemeProvider>
        <ToastContainer />
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeProvider>
    </WSContextProvider>
  </StrictMode>
);
