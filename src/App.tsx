import { Route } from "react-router";
import { Routes } from "react-router";
import AuthRoute from "./routes/auth/auth";
import { Toaster } from "componentsla";
import ProtecterRoute from "./components/shared/ProtecterRoute/ProtecterRoute";
import TleoRoute from "./routes/tlelo/TleoRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<AuthRoute />} />
        <Route
          path="/*"
          element={
            <ProtecterRoute>
              <TleoRoute />
            </ProtecterRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}
