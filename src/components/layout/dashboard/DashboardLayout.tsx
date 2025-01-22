import { ReactNode } from "react";
import Header from "./Header";
import Aside from "./Aside";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <div className="flex-1 flex w-full flex-col min-h-screen">
        <Header />
        <div className="flex h-full">
          <Aside />
          {children}
        </div>
      </div>
    </div>
  );
}
