"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FaBullseye, FaEye } from "react-icons/fa";
import SectionContact from "../contact/SectionContact";
import SectionProjects from "../projects/SectionProject";

export default function AboutPage() {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.4 });

  const visionRef = useRef(null);
  const visionInView = useInView(visionRef, { once: true, amount: 0.4 });

  const whoRef = useRef(null);
  const whoInView = useInView(whoRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-100">
      {/* Intro Section */}
      <section ref={introRef} className="py-20 px-6 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h1 className="lg:text-5xl md:text-3xl text-2xl font-extrabold mb-6 leading-tight">
              Innovative Support and Solution
            </h1>
            <p className="lg:text-xl md:text-xl text-sm text-gray-600 dark:text-gray-300">
              PT EVINDO GLOBAL PUTRA, kami memahami kesulitan membangun sesuatu
              yang baru. Itulah sebabnya kami hadir untuk membantu startup
              seperti Anda berkembang lebih cerdas, bukan lebih keras. Baik Anda
              sedang menyempurnakan MVP atau bersiap untuk pertumbuhan pesat,
              kami membangun sistem yang tumbuh bersama Anda dan memicu inovasi
              di area yang paling penting.
            </p>
          </div>

          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/images/bgtemplate.jpg"
              alt="About Vision"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Vision & Mission Section */}
      <section
        ref={visionRef}
        className="py-20 px-6 bg-blue-100  dark:bg-blue-800"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto"
        >
          <div className="space-y-8 md:text-wrap">
            {[
              {
                icon: <FaEye className="text-white text-xl" />,
                title: "Our Vision",
                desc: "To empower businesses with smart, adaptive, and scalable solutions so they can grow faster, work smarter, and innovate endlessly.",
              },
              {
                icon: <FaBullseye className="text-white text-xl" />,
                title: "Our Mission",
                desc: "We exist to help our partners solve real problems through technology. From system development to business process transformation, we create solutions that drive measurable impact no fluff, just results.",
              },
              // {
              //   icon: <FaHandshake className="text-white text-xl" />,
              //   title: "Collaboration",
              //   desc: "Kami percaya bahwa sinergi dan kolaborasi strategis dengan mitra, klien, serta pemangku kepentingan merupakan kunci untuk mencapai pertumbuhan berkelanjutan.",
              // },
              // {
              //   icon: <FaRocket className="text-white text-xl" />,
              //   title: "Growth",
              //   desc: "Pertumbuhan bagi kami tidak hanya terletak pada ekspansi bisnis, tetapi juga pada penguatan kapasitas, pengembangan talenta, serta penciptaan nilai jangka panjang bagi semua stakeholder.",
              // },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-start gap-6 max-w-xl"
              >
                <div className="bg-blue-700 p-4 rounded-md">{item.icon}</div>
                <div>
                  <h3 className="text-3xl font-semibold mb-1">{item.title}</h3>
                  <p className="">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section ref={whoRef} className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={whoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center"
        >
          <h2 className="text-3xl md:text-3xl lg:text-5xl text-blue-700 font-bold mb-4">
            Who We Are
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 dark:text-gray-300 text-md md:text-xl lg:text-xl mb-10">
            Kami adalah tim multidisiplin yang terdiri dari engineer,
            strategist, dan problem-solver yang percaya bahwa setiap bisnis
            besar atau kecil layak mendapatkan sistem kerja yang efisien dan
            inovatif. Kami tidak hanya “mengerjakan proyek”, tapi ikut membangun
            pondasi bisnis digital klien untuk jangka panjang.
          </p>

          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/images/bgtemplate.jpg"
              alt="Who We Are"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </motion.div>
      </section>

      <div>
        <SectionProjects />
      </div>

      <div>
        <SectionContact />
      </div>
    </div>
  );
}
