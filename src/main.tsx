import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "componentsla/dist/style.css";
import { AuthProvider } from "./context/AuthContex.tsx";
import { ToasterProvider } from "componentsla";

createRoot(document.getElementById("root")!).render(
  <ToasterProvider>
    <BrowserRouter>
      <AuthProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AuthProvider>
    </BrowserRouter>
  </ToasterProvider>
);
