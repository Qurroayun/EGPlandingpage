// components/layout/DashboardShell.tsx
"use client";

import DashboardHeader from "@/components/header/DashboardHeader";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { ReactNode } from "react";

export default function DashboardShell({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col transition-all duration-300">
          <DashboardHeader name={name} />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
