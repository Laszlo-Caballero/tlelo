import { Route, Routes } from "react-router";

export default function TleoRoute() {
  return (
    <Routes>
      <Route path="/" element={<div>home</div>} />
    </Routes>
  );
}
