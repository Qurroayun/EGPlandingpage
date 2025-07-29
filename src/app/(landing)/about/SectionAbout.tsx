"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaChartLine,
  FaLeaf,
  FaLightbulb,
  FaRegArrowAltCircleRight,
  FaRocket,
} from "react-icons/fa";

export default function SectionAbout() {
  const cards = [
    {
      title: "Strategic Vision",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: <FaLightbulb className="text-white w-5 h-5" />,
    },
    {
      title: "Market Position",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: <FaChartLine className="text-white w-5 h-5" />,
    },
    {
      title: "Innovation & Growth",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: <FaRocket className="text-white w-5 h-5" />,
    },
    {
      title: "Sustainable Impact",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: <FaLeaf className="text-white w-5 h-5" />,
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-blue-100 dark:bg-blue-200 py-20 transition-colors duration-500 overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-pink-500 blur-3xl opacity-20 animate-pulse-slow z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-indigo-500 blur-3xl opacity-20 animate-pulse-slow z-0" />

      <div className="container  mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Title & Paragraph */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 dark:text-blue-900 mb-6">
              About Strategic Holdings
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-black">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry’s standard dummy
                text ever since the 1500s.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry’s standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="items-start flex text-center mt-10">
              <Link href="/projects">
                <button className="group h-8 w-52 bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition flex justify-center items-center gap-2 mx-auto">
                  View all Projects
                  <FaRegArrowAltCircleRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Cards 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="w-10 h-10 bg-blue-900 rounded-md mb-4 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
