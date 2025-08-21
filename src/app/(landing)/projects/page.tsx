"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegArrowAltCircleRight, FaSearch } from "react-icons/fa";

interface Project {
  id: string;
  slug: string;
  name: string;
  image?: string[];
  description?: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/projects?all=true");
        const data = await res.json();
        setProjects(Array.isArray(data.projects) ? data.projects : []);
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

  // Filter projects berdasarkan search term
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white dark:bg-black py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Our Subsidiaries & Investment
        </h1>
        <p className="text-md md:text-xl text-center text-gray-600 dark:text-gray-400 mb-6 max-w-6xl mx-auto">
          Dengan jaringan anak perusahaan dan investasi lintas sektor, kami
          terus memperluas jangkauan dan memberikan nilai tambah bagi
          stakeholder.
        </p>

        {/* Input Search */}
        <div className="flex justify-end mb-8 mt-4">
          <div className="relative w-full max-w-md">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 dark:border-zinc-700 rounded-lg px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="text-gray-500 text-center">
            Tidak ada project yang sesuai.
          </p>
        ) : (
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-md p-6 border border-gray-200 dark:border-zinc-700 transition"
              >
                <div className="w-full md:w-1/3">
                  <Image
                    src={
                      project.image && project.image.length > 0
                        ? project.image[0]
                        : "https://via.placeholder.com/600x400?text=No+Image"
                    }
                    alt={project.name || "Project Image"}
                    width={600}
                    height={400}
                    className="rounded-md w-full h-68 md:h-68 object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project.name}
                  </h2>
                  {project.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-md">
                      {project.description.slice(0, 100)}
                      {project.description.length > 100 ? "..." : ""}
                    </p>
                  )}

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
