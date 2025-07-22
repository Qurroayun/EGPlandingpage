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
  const [categories, setCategories] = useState<
    { name: string; slug: string }[]
  >([]);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Careers", href: "/careers" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Fetch categories from backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/subsidiariesandinvesment-category");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow-md">
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
              className="text-sm font-medium transition-all duration-700 hover:text-primary hover:scale-[1.2]"
            >
              {link.name}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium flex items-center gap-1 transition-all duration-700 hover:text-primary hover:scale-[1.2] focus:outline-none">
              Our Subsidiaries & Invesment
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-max max-w-[90vw] md:max-w-[400px] flex-wrap bg-white dark:bg-black shadow-md rounded-lg px-4 py-2 flex gap-4 whitespace-nowrap z-50"
            >
              {categories.length === 0 ? (
                <span className="text-sm text-gray-400">No categories</span>
              ) : (
                categories.map((cat) => (
                  <DropdownMenuItem asChild key={cat.slug}>
                    <Link
                      href={`/subsidiariesandinvesment/${cat.slug}`}
                      className="transition-all duration-300 hover:text-primary"
                    >
                      {cat.name}
                    </Link>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/auth/login">
            <Button
              size="sm"
              variant="outline"
              className="transition-all duration-300 hover:bg-white/15 hover:shadow-md hover:scale-[1.03]"
            >
              Login
            </Button>
          </Link>
          {mounted && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full transition-all duration-700 hover:bg-muted hover:text-primary hover:scale-[1.2]"
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
              className="block text-sm font-medium transition-all duration-300 hover:text-primary hover:underline hover:scale-[1.02]"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Dropdown Manual */}
          <button
            onClick={() => setShowMobileService(!showMobileService)}
            className="w-full text-left text-sm font-medium flex items-center transition-all duration-300 hover:text-primary hover:underline hover:scale-[1.02]"
          >
            Our Subsidiaries & Invesment{" "}
            <ChevronDown
              className={`w-4 h-4 transition-transform ml-2 ${
                showMobileService ? "rotate-180" : ""
              }`}
            />
          </button>

          {showMobileService && (
            <div className="pl-4 flex flex-wrap gap-2 pt-2">
              {categories.length === 0 ? (
                <span className="text-sm text-gray-400">No categories</span>
              ) : (
                categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/subsidiariesandinvesment/${cat.slug}`}
                    className="px-3 py-1 text-sm font-medium border rounded-lg transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-md hover:scale-[1.03]"
                    onClick={() => setIsOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))
              )}
            </div>
          )}

          {/* Mobile Footer Action */}
          {mounted && (
            <div className="flex items-center justify-between pt-2">
              <Link href="/auth/login">
                <Button
                  size="sm"
                  variant="outline"
                  className="transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-md hover:scale-[1.03]"
                >
                  Login
                </Button>
              </Link>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full transition-all duration-300 hover:bg-muted hover:text-primary hover:scale-110"
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
