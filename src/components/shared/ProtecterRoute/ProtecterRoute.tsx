import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router";
import { authConfig } from "@/config/config";

export default function ProtecterRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token =
    localStorage.getItem(authConfig.tokenStorage) ??
    Cookies.get(authConfig.tokenCookie);

  console.log(token);

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children ? children : <Outlet />;
}
