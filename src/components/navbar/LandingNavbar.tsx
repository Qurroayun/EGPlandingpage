"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileService, setShowMobileService] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  // ✅ supaya dark mode toggle tidak error hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Tutup mobile menu kalau klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowMobileService(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow-sm rounded-3xl">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image
            src="/images/logoevindo.png"
            alt="EGP"
            width={32}
            height={32}
            priority
          />
          <h1 className="text-base md:text-xl whitespace-nowrap">
            Evindo Global Putra
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:underline"
            >
              {link.name}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium flex items-center gap-1 hover:underline focus:outline-none">
              Our Business
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-max max-w-[90vw] md:max-w-[400px] flex-wrap bg-white dark:bg-black shadow-md rounded-lg px-4 py-2 flex gap-4 whitespace-nowrap z-50"
            >
              <DropdownMenuItem asChild>
                <Link href="/services/contructions">Service 1</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/restorant">Service 2</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/service3">Service 3</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/app/login">
            <Button size="sm" variant="outline">
              Login
            </Button>
          </Link>
          {mounted && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          ref={mobileNavRef}
          className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-black"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-sm font-medium hover:underline"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Dropdown Manual */}
          <button
            onClick={() => setShowMobileService(!showMobileService)}
            className="w-full text-left text-sm font-medium flex items-center hover:underline"
          >
            Our Business{" "}
            <ChevronDown
              className={`w-4 h-4 transition-transform ml-2 ${
                showMobileService ? "rotate-180" : ""
              }`}
            />
          </button>

          {showMobileService && (
            <div className="pl-4 flex flex-wrap gap-2 pt-2">
              {["Service 1", "Service 2", "Service 3"].map((s, i) => (
                <Link
                  key={s}
                  href={`#service${i + 1}`}
                  className="px-3 py-1 text-sm font-medium border rounded-lg hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  {s}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Footer Action */}
          {mounted && (
            <div className="flex items-center justify-between pt-2">
              <Link href="/app/login">
                <Button size="sm" variant="outline">
                  Login
                </Button>
              </Link>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
