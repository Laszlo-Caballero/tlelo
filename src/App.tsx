import { Route } from "react-router";
import { Routes } from "react-router";
import AuthRoute from "./routes/auth/auth";

export default function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoute />} />
    </Routes>
  );
}
