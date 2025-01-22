import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { Route, Routes } from "react-router";

export default function TleoRoute() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<div>home</div>} />
      </Routes>
    </DashboardLayout>
  );
}
