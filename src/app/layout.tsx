import LayoutWrapper from "@/components/layout-wrapper";
import { ThemeProvider } from "@/providers/theme-providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evindo Global Putra",
  description: "Holding company in indonesia",
  icons: {
    icon: {
      url: "/images/logoevindo.png",
      sizes: "32x32",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              <LayoutWrapper>{children}</LayoutWrapper>
              <Toaster position="top-right" richColors />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
