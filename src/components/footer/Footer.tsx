"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 py-10 mt-12">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-start space-y-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logoevindo.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Evindo Global Putra
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Jakarta Office:</strong>
            <br />
            Jl. Pantai Indah Kapuk, Jl. Marina Raya Ruko Cordoba No.38 Blok H,{" "}
            <br />
            RT.6/RW.2, Kamal Muara, Penjaringan, Jakarta Utara 14470
          </p>
        </div>

        {/* Services */}
        <div className="flex flex-col items-start space-y-2">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">
            Services
          </h4>
          <Link
            href="/services/constructions"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Construction
          </Link>
          <Link
            href="/services/restaurants"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Restaurant
          </Link>
          <Link
            href="/services/consulting"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Consulting
          </Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-start space-y-2">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">
            Legal
          </h4>
          <Link
            href="/privacy"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Terms of Service
          </Link>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col items-start space-y-3">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">
            Follow Us
          </h4>
          <div className="flex space-x-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://glints.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-red-600"
            >
              <IoStarSharp size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8">
        &copy; {new Date().getFullYear()} Evindo Global Putra. All rights
        reserved.
      </div>
    </footer>
  );
}
