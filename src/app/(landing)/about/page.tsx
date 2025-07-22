"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaHandshake, FaLightbulb, FaRocket } from "react-icons/fa";

export default function AboutPage() {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.4 });

  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.4 });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-gradient-to-tr  dark:from-black dark:to-black text-gray-800 dark:text-gray-100">
      {/* Intro Section */}
      <section ref={introRef} className="py-24 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-extrabold mb-6">
            Kami{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Ada</span>{" "}
            Untuk Membuat Perubahan
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Kami adalah kumpulan kreator, inovator, dan pemimpi yang percaya
            bahwa teknologi bisa menyentuh hati manusia dan menciptakan dampak
            nyata.
          </p>
        </motion.div>
      </section>

      {/* Nilai Inti Section */}
      <section ref={valuesRef} className="py-10 px-6  dark:bg-gray-800 ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Apa yang Kami Junjung
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLightbulb className="text-4xl text-yellow-400" />,
                title: "Innovation",
                desc: "Continuous Innovation & ideas for our partner and Subsidiaries",
              },
              {
                icon: <FaHandshake className="text-4xl text-green-500" />,
                title: "Kolaborasi",
                desc: "Kami percaya bahwa kerja tim adalah fondasi kesuksesan.",
              },
              {
                icon: <FaRocket className="text-4xl text-pink-500" />,
                title: "Growth",
                desc: "We are build for Growth",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-indigo-50 dark:bg-gray-700 p-8 rounded-xl hover:shadow-lg transition-all border border-transparent hover:border-indigo-200 dark:hover:border-gray-400"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
