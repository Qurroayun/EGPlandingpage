"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="container py-8 px-4 mx-auto">
      <Button
        variant="outline"
        className="transition-all duration-300 hover:scale-[1.03] 
          bg-background text-foreground hover:bg-accent hover:text-accent-foreground
          dark:bg-[#1e1e1e] dark:hover:bg-[#2e2e2e]"
        onClick={() => history.back()}
      >
        Back to Projects
      </Button>

      <div className="mt-5">
        <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
        <Card className="overflow-hidden shadow-xl">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-64 object-cover"
          />
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <p className="text-gray-700 flex-1">
                {project.description || "No description provided."}
              </p>

              {project.url && (
                <Button asChild className="ml-4" variant="default">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Project
                  </a>
                </Button>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-4">
              {formatTanggal(project.createdAt)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
