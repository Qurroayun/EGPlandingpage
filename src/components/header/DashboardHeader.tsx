// src/components/header/DashboardHeader.tsx
"use client";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardHeader({ name }: { name: string }) {
  return (
    <header className="flex sticky top-0 z-50 items-center justify-between px-4 md:px-6 py-4 border-b bg-white dark:bg-black">
      {/* Sidebar Toggle + User Info (Left) */}
      <div className="flex items-center gap-3 md:gap-5">
        <Link href="/dashboard/user" className="flex items-center gap-2">
          <Image
            src="/globe.svg"
            alt="User"
            width={36}
            height={36}
            className="rounded-full border border-gray-300 dark:border-gray-600"
          />
          <span className="text-sm md:text-base font-medium text-gray-700 dark:text-white">
            Hi, {name}
          </span>
        </Link>
      </div>

      {/* Logo + Company Name (Center on Desktop) */}
      <div className="hidden md:flex items-center gap-3">
        <Image
          src="/images/logoevindo.png"
          alt="EGP Logo"
          width={40}
          height={40}
          className="rounded-2xl shadow-md"
        />
        <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
          Evindo Global Putra
        </span>
      </div>

      {/* Notification Icon (Right) */}
      <div className="flex items-center">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        </button>
      </div>
    </header>
  );
}
