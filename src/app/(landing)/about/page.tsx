"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FaBullseye, FaEye, FaHandshake, FaRocket } from "react-icons/fa";
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
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Innovative Support and Solution
            </h1>
            <p className="text-md text-gray-600 dark:text-gray-300">
              At PT EVINDO GLOBAL PUTRA, We understand the hustle of building
              something new. That's why we're here to help startups like yours
              scale smarter, not harder. Whether you're refining your MVP or
              gearing up for rapid growth, we build systems that grow with you
              and spark innovation where it matters most.
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
          <div className="space-y-8">
            {[
              {
                icon: <FaEye className="text-white text-xl" />,
                title: "Our Vision",
                desc: "Menjadi perusahaan teknologi terdepan yang memberikan solusi inovatif dan berdampak positif bagi masyarakat global.",
              },
              {
                icon: <FaBullseye className="text-white text-xl" />,
                title: "Our Mission",
                desc: "Membangun ekosistem digital yang kolaboratif, berkelanjutan, dan mampu mempercepat transformasi industri melalui teknologi.",
              },
              {
                icon: <FaHandshake className="text-white text-xl" />,
                title: "Collaboration",
                desc: "Kami percaya bahwa kerja sama yang solid adalah fondasi untuk mencapai hasil luar biasa bersama mitra & tim.",
              },
              {
                icon: <FaRocket className="text-white text-xl" />,
                title: "Growth",
                desc: "Kami berkomitmen untuk pertumbuhan berkelanjutan baik dalam skala bisnis maupun pengembangan SDM.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-start gap-6"
              >
                <div className="bg-blue-700 p-4 rounded-md">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
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
          <h2 className="text-3xl text-blue-700 font-bold mb-4">Who We Are</h2>
          <p className="max-w-3xl mx-auto text-gray-400 dark:text-gray-300 text-md mb-10">
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
