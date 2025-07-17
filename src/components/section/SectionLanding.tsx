"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaLinkedin } from "react-icons/fa";
import { Button } from "../ui/button";

const MotionH1 = motion.h1;
const MotionDiv = motion.div;

export default function SectionLanding() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-white dark:bg-black transition-colors duration-500">
      {/* Decorative Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full  dark:bg-indigo-800 blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] rounded-full  dark:bg-blue-800 blur-3xl opacity-20 animate-pulse-slow" />

      <div className="container mx-auto px-6 py-20 md:py-32 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <MotionH1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl md:text-6xl font-extrabold leading-snug tracking-tight text-gray-900 dark:text-white"
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Evindo Global Putra
            </span>
            <br />
            <span className="text-gray-700 dark:text-gray-300">
              Innovative Holding Company
            </span>
          </MotionH1>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 md:mt-10 text-lg md:text-2xl text-gray-600 dark:text-gray-400"
          >
            <p>
              Empowering businesses with tailored strategies and cutting-edge
              innovations.
            </p>
            <p className="mt-3">
              Let’s shape the future of digital enterprise—together.
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex justify-center flex-wrap gap-4"
          >
            <Link href="https://linkedin.com" target="_blank">
              <Button className="group px-8 py-4 text-base md:text-lg font-medium rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md flex items-center gap-2">
                Connect on LinkedIn
                <FaLinkedin className="w-5 h-5" />
                <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>

            <Link href="/about">
              <Button
                variant="outline"
                className="px-8 py-4 text-base md:text-lg font-medium rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                Learn About Us
              </Button>
            </Link>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
