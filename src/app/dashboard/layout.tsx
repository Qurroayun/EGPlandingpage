"use client";

import DashboardHeader from "@/components/header/DashboardHeader";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function DashboardShell({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isOpen ? "ml-1" : "ml-2"
        )}
      >
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}
