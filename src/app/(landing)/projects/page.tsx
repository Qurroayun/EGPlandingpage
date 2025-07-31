"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

// Format tanggal Indonesia
function formatTanggal(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Project {
  id: string;
  slug: string;
  name: string;
  image?: string;
  description?: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setProjects([]);
      }
    };
    fetchData();
  }, []);

  if (projects === null) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-black py-16 px-4">
      <div className="container mx-auto">
        {/* Title & Desc */}
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Our Subsidiaries & Investment
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, maxime
          voluptate architecto, delectus tenetur fugiat deleniti quae, pariatur
          fuga nobis repellendus nulla? Optio iusto error asperiores inventore
          rerum molestiae.
        </p>

        {/* Project List */}
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center">
            Belum ada project yang tersedia.
          </p>
        ) : (
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-md p-6 border border-gray-200 dark:border-zinc-700 transition"
              >
                {/* Gambar */}
                <div className="w-full md:w-1/3">
                  <Image
                    src={project.image || "https://via.placeholder.com/600x400"}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="rounded-md w-full h-68 md:h-68 object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project.name}
                  </h2>
                  {project.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                      {project.description.slice(0, 300)}
                      {project.description.length > 300 ? "..." : ""}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mb-4">
                    Diterbitkan: {formatTanggal(project.createdAt)}
                  </p>

                  <Link href={`/projects/${project.slug}/${project.id}`}>
                    <button className="group px-4 h-8 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2 mt-2">
                      View Detail
                      <FaRegArrowAltCircleRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
