"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  image?: string;
  slug: string;
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function SectionRandomShow() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = (await res.json()) as Project[]; // ✅ casting aman di sini
        const randomProjects = shuffleArray(data).slice(0, 3);
        setProjects(randomProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-10 container mx-auto bg-white dark:bg-black transition-colors duration-500">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-blue-900 dark:text-white mb-6">
          More Subsidiaries & Investment
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}/${project.id}`}
                className="bg-white dark:bg-zinc-800 p-6 rounded-xl dark:hover:shadow-2xl hover:shadow-2xl transition block border border-gray-400 dark:border-zinc-700"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={400}
                      height={400}
                      className="relative w-full h-68 object-cover rounded mb-4"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 dark:bg-zinc-700 rounded mb-4" />
                  )}
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
      </div>
    </section>
  );
}
