"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("❌ Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProject();
  }, [id]);

  const formatTanggal = (date: Date | string) => {
    const tanggal = typeof date === "string" ? new Date(date) : date;
    return tanggal.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-64 w-full rounded-xl mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (!project) {
    return <div className="p-4 text-red-500">Project not found.</div>;
  }

  const images: string[] = Array.isArray(project.image)
    ? project.image
    : project.image
    ? [project.image]
    : [];

  const mainImage = images[0] || "https://via.placeholder.com/600x400";
  const additionalImages = images.slice(1);

  return (
    <div className="container mx-auto py-10 px-4 space-y-10">
      <Button
        variant="outline"
        className="mb-6 transition hover:scale-[1.03]"
        onClick={() => history.back()}
      >
        Back to Projects
      </Button>

      {/* Gambar utama + Nama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div whileHover={{ scale: 1.03 }}>
          <Image
            src={mainImage}
            alt={project.name}
            width={600}
            height={400}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </motion.div>
        <h1 className="text-3xl font-bold text-blue-900 dark:text-white">
          {project.name}
        </h1>
      </div>

      {/* Deskripsi tetap di grid 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
            {project.description || "No description provided."}
          </p>

          {project.url && (
            <Button asChild className="mt-4">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                Visit Project
              </a>
            </Button>
          )}
        </div>

        {/* Gambar kedua (jika ada) */}
        {additionalImages[0] && (
          <motion.div whileHover={{ scale: 1.03 }}>
            <Image
              src={additionalImages[0]}
              alt={`${project.name}-secondary`}
              width={600}
              height={400}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </motion.div>
        )}
      </div>

      {/* Section baru untuk sisa gambar (lebih dari 2) */}
      {additionalImages.length > 1 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {additionalImages.slice(1).map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer rounded-xl overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${project.name}-gallery-${idx}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
