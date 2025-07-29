"use client";

import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Projects", href: "/projects" },
    // { name: "Careers", href: "/careers" },
    { name: "Contacts Us", href: "#contact" },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky z-50 top-0 transition-all duration-300`}>
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-blue-100 dark:bg-black shadow-lg"
            : "bg-blue-100 dark:bg-black/50 backdrop-blur-md shadow-md"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold"
            >
              <Image
                src="/images/logoevindo.png"
                alt="EGP"
                width={45}
                height={45}
                priority
              />
              <div className="flex flex-col leading-tight">
                <span className="text-base md:text-md">PT Evindo</span>
                <span className="text-base md:text-md">Global Putra</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              <nav className="flex items-center gap-6">
                {navLinks.map((link) =>
                  link.href.startsWith("#") ? (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const section = document.querySelector(link.href);
                        section?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-[1.1]"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-[1.1]"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </nav>

              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-blue-100 hover:bg-blue-200"
                  >
                    Login
                  </Button>
                </Link>
                {mounted && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="hover:bg-blue-200"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div
            ref={mobileNavRef}
            className="md:hidden px-4 pb-4 space-y-2 bg-blue-100 dark:bg-black"
          >
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const section = document.querySelector(link.href);
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-sm font-medium transition hover:text-primary"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm font-medium transition hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}

            {mounted && (
              <div className="flex items-center justify-between pt-2">
                <Link href="/auth/login">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-blue-100 hover:bg-blue-200"
                  >
                    Login
                  </Button>
                </Link>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hover:bg-blue-200"
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
      </div>
    </header>
  );
}
