"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FaHeart, FaLinkedin, FaRegGem, FaUsers } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";

export default function CareerPage() {
  const benefits = [
    {
      icon: <FaRegGem className="text-2xl" />,
      title: "Peluang Berkembang",
      desc: "Program pengembangan karir dan pelatihan berkala",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Tim Solid",
      desc: "Bekerja dengan profesional berpengalaman di bidangnya",
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Keseimbangan Hidup",
      desc: "Fleksibilitas kerja dan program kesejahteraan",
    },
  ];

  const MotionDiv = motion.div;

  // CTA Section Ref
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-black dark:to-gray-800 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <MotionDiv
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-6 md:mt-10"
              >
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  Bergabunglah Dengan{" "}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Perjalanan Kami
                  </span>
                </h1>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Kami selalu mencari talenta berbakat untuk bergabung dengan
                  tim. Kirimkan aplikasi Anda dan mari berbicara tentang
                  bagaimana Anda bisa berkontribusi!
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="https://linkedin.com/company/your-company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <IoStarSharp />
                  Glints
                </a>

                <a
                  href="https://linkedin.com/company/your-company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
              </MotionDiv>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl hidden md:block lg:block">
              <Image
                src="/images/objcareer.jpg"
                alt="Tim Kami Bekerja"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 dark:from-gray-900/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Kenapa Bergabung Dengan Kami?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Kami menawarkan lingkungan kerja yang mendukung dan penuh peluang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((item, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, amount: 0.2 });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-indigo-50 dark:bg-gray-700 p-8 rounded-xl hover:shadow-lg transition-all border border-transparent hover:border-indigo-200 dark:hover:border-gray-400"
                >
                  <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 bg-indigo-600 dark:bg-black text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Tertarik Bergabung?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kirimkan CV Anda dan kami akan menghubungi ketika ada posisi yang
            sesuai dengan profil Anda.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://linkedin.com/company/your-company"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <IoStarSharp />
              Glints
            </a>

            <a
              href="https://linkedin.com/company/your-company"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
