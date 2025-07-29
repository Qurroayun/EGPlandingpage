"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

  return (
    <div className="container mx-auto py-10 px-4 space-y-10">
      <Button
        variant="outline"
        className="mb-6 transition hover:scale-[1.03]"
        onClick={() => history.back()}
      >
        Back to Projects
      </Button>

      {/* Baris 1: kiri gambar - kanan nama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
        <h1 className="text-3xl font-bold text-blue-900 dark:text-white">
          {project.name}
        </h1>
      </div>

      {/* Baris 2: kiri deskripsi - kanan gambar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
            {project.description || "No description provided."}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Diterbitkan: {formatTanggal(project.createdAt)}
          </p>

          {project.url && (
            <Button asChild className="mt-4">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                Visit Project
              </a>
            </Button>
          )}
        </div>

        <img
          src={project.image}
          alt={`${project.name}-secondary`}
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
      </div>
    </div>
  );
}
