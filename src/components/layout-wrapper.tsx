"use client";

import Footer from "@/components/footer/Footer";
import LandingNavbar from "@/components/navbar/LandingNavbar";
import { ThemeProvider } from "@/providers/theme-providers";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex flex-col min-h-screen">
        {!isDashboard && <LandingNavbar />}
        <main className="flex-1">{children}</main>
        {!isDashboard && <Footer />}
      </div>
    </ThemeProvider>
  );
}
