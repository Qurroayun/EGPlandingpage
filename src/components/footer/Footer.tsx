"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaFacebookF, FaLinkedin } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-blue-900  text-white py-12 mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/logoevindo.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="text-lg font-semibold">Evindo Global Putra</span>
          </div>
          <p className="text-sm text-white/90 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            adipisci assumenda labore ratione atque asperiores, odit est
            molestias.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[FaLinkedin, IoStarSharp, FaEnvelope, FaFacebookF].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition"
                >
                  <Icon className="text-white text-lg" />
                </div>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:underline">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-sm text-white/90 mb-2">
            <strong>Jakarta Office:</strong> <br />
            Jl. Pantai Indah Kapuk, Ruko Cordoba No.38 Blok H, <br />
            Kamal Muara, Penjaringan, Jakarta Utara 14470
          </p>
          <p className="text-sm text-white/90 mb-1">+62 851765896523</p>
          <p className="text-sm text-white/90">info@gmail.com</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container mx-auto border-t border-white/20 mt-10 pt-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
        <div className="mb-3 md:mb-0">
          &copy; {new Date().getFullYear()} Evindo Global Putra. All rights
          reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/cookies" className="hover:underline">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
