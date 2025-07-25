// src/app/dashboard/layout.tsx
export const dynamic = "force-dynamic";

import DashboardHeader from "@/components/header/DashboardHeader";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect kalau tidak login
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Unauthorized. Please login.
      </div>
    );
  }

  const name = session.user?.name ?? "User";

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
