"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Buat helper untuk format tanggal
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

  if (projects === null)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Daftar Project</h1>
      {projects.length === 0 ? (
        <p className="text-gray-500">Belum ada project yang tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}/${project.id}`}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <Image
                src={project.image || "https://via.placeholder.com/300"}
                alt={project.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">{project.name}</h2>
              {project.description && (
                <p className="text-sm text-gray-500 line-clamp-2">
                  {project.description}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-3">
                {formatTanggal(project.createdAt)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
