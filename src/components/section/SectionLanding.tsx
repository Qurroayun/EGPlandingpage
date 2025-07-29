"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Button } from "../ui/button";

const MotionH1 = motion.h1;
const MotionDiv = motion.div;

export default function SectionLanding() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center z-0"
      style={{ backgroundImage: "url('/images/bgtemplate.jpg')" }}
    >
      {/* Background Overlay jika butuh efek gelap */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50 z-0" />

      {/* Content */}
      <div className="relative container mx-auto px-6 py-20 md:py-32 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <MotionH1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl md:text-6xl font-extrabold leading-snug tracking-tight text-white"
          >
            <span className="block mt-4">
              Innovative Support <br className="hidden md:block" /> and Solution
            </span>
          </MotionH1>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 md:mt-10 text-lg md:text-2xl text-white/90"
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
              <Button className="group px-8 py-4 text-base md:text-lg font-medium rounded-xl bg-blue-900 text-white hover:bg-blue-600 transition-all duration-300 shadow-md flex items-center gap-2">
                Find Out More
                <FaRegArrowAltCircleRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
