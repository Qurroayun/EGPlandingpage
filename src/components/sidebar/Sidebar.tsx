"use client";

import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  LayoutDashboard,
  Lock,
  LogOut,
  Moon,
  PencilRuler,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/auth/login",
    });
  };

  return (
    <aside
      className={cn(
        "flex top-0 left-0 z-50 bg-white dark:bg-black border-r h-screen p-4 flex-col justify-between sticky transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div>
        {/* Collapse Button */}
        <button
          onClick={toggle}
          className="mb-6 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>

        <Separator className="mb-6 mt-0.5" />

        {/* Main Navigation */}
        <nav className="space-y-2">
          <SidebarItem
            href="/dashboard"
            icon={<LayoutDashboard />}
            label="Dashboard"
          />
          <SidebarItem
            href="/dashboard/projects"
            icon={<PencilRuler />}
            label="Projects"
          />

          {/* Subsidiaries & Investment - OFF */}
          {/*
          <div>
            <button
              onClick={() => setBusinessOpen(!businessOpen)}
              className="flex items-center gap-3 p-2 w-full rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <span className="text-lg">
                <Building />
              </span>
              {isOpen && (
                <span className="text-sm font-medium flex-1 text-left">
                  Subsidiaries & Investment
                </span>
              )}
              {isOpen && (
                <span className="text-lg ">
                  {businessOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </span>
              )}
            </button>

            {businessOpen && isOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <SidebarItem
                  href="/dashboard/subsidiariesandinvesment/categories"
                  icon={<Folder className="w-4 h-4" />}
                  label="Category"
                  small
                />
                <SidebarItem
                  href="/dashboard/subsidiariesandinvesment/items"
                  icon={<FileText className="w-4 h-4" />}
                  label="Items"
                  small
                />
              </div>
            )}
          </div>
          */}

          {/* Contact - OFF */}
          {/*
          <SidebarItem
            href="/dashboard/contact"
            icon={<Contact />}
            label="Contact"
          />
          */}

          {/* Settings Menu with Submenu */}
          <div>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="flex items-center gap-3 p-2 w-full rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <span className="text-lg">
                <Settings />
              </span>
              {isOpen && (
                <span className="text-sm font-medium flex-1 text-left">
                  Settings
                </span>
              )}
              {isOpen && (
                <span className="text-lg ">
                  {settingsOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </span>
              )}
            </button>

            {settingsOpen && isOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <SidebarItem
                  href="/dashboard/profile"
                  icon={<Users className="w-4 h-4" />}
                  label="Profile"
                  small
                />
                <SidebarItem
                  href="/dashboard/security"
                  icon={<Lock className="w-4 h-4" />}
                  label="Security"
                  small
                />
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div>
        <button
          onClick={toggleTheme}
          className="flex items-center w-full gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mb-2"
        >
          <span className="text-lg">{isDarkMode ? <Sun /> : <Moon />}</span>
          {isOpen && (
            <span className="text-sm font-medium">
              {isDarkMode ? "Light" : "Dark"}
            </span>
          )}
        </button>

        <Separator className="my-4" />

        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <span className="text-lg">
            <LogOut />
          </span>
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  small = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  small?: boolean;
}) {
  const { isOpen } = useSidebar();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
        small && "text-sm text-gray-600"
      )}
    >
      <span className="text-lg">{icon}</span>
      {isOpen && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
}
