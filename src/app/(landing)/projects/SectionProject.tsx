"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

interface Project {
  id: number;
  name: string;
  description: string;
  image?: string;
  slug: string;
}

export default function SectionProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-20 container mx-auto min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-blue-900 dark:text-white mb-6">
          Our Subsidiaries & Investment
        </h2>
        <p className="text-center text-gray-400 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}/${project.id}`}
                className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow hover:shadow-lg transition block border border-gray-400 dark:border-zinc-700"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                >
                  <div className="w-full h-40 bg-gray-200 dark:bg-zinc-700 rounded mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-400 text-sm mt-2">
                    {project.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="group inline-flex h-10 w-52 bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition justify-center items-center gap-2"
          >
            View all Projects
            <FaRegArrowAltCircleRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
