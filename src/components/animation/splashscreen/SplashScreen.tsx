"use client";

import { cn } from "@/lib/utils"; // Assuming you have a utility class merger
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

const Particle = ({ x, y, color }: { x: number; y: number; color: string }) => {
  const size = Math.random() * 5 + 2;
  return (
    <motion.div
      className={`absolute rounded-full ${color}`}
      initial={{
        x,
        y,
        opacity: 1,
        scale: 0,
      }}
      animate={{
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 1,
      }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
      }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; color: string }>
  >([]);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    // Animate counter
    const controls = animate(count, 100, { duration: 3, ease: "easeInOut" });

    // Create particles periodically
    const particleInterval = setInterval(() => {
      const newParticles = Array.from({ length: 15 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: `bg-${
          ["blue", "green", "red"][Math.floor(Math.random() * 3)]
        }-500`,
      }));
      setParticles((prev) => [...prev, ...newParticles]);
    }, 300);

    return () => {
      clearTimeout(timer);
      controls.stop();
      clearInterval(particleInterval);
    };
  }, [onFinish, count]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Particles */}
      {particles.map((particle, i) => (
        <Particle key={i} {...particle} />
      ))}

      {/* Glowing background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1.5 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-green-500 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 rounded-full bg-red-500 blur-3xl" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4"
        >
          Welcome to
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative"
        >
          <motion.h2
            className={cn(
              "text-5xl md:text-7xl font-extrabold mb-8",
              "bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-red-500",
              "dark:from-green-300 dark:via-blue-400 dark:to-red-400"
            )}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Evindo Global Putra
          </motion.h2>
        </motion.div>

        {/* Loading counter */}
        <motion.div
          className="text-gray-500 dark:text-gray-400 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading... <motion.span>{rounded}</motion.span>%
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full w-64 mt-2 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
