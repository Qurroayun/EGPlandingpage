"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  description?: string;
  url?: string;
  image?: string[]; // now array
  slug: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    files: [] as File[], // support multiple files
  });

  const [errors, setErrors] = useState({ name: "" });

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", url: "", files: [] });
    setErrors({ name: "" });
    setIsEdit(false);
    setCurrentProject(null);
  };

  // Submit create/update
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setErrors({ name: "Project name is required" });
      return;
    }

    setLoading(true);
    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("description", formData.description);
      body.append("url", formData.url);

      formData.files.forEach((file) => body.append("image", file));

      const url =
        isEdit && currentProject
          ? `/api/projects/${currentProject.id}`
          : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, { method, body });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save project");
      }

      setOpen(false);
      resetForm();
      await fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert(error instanceof Error ? error.message : "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEdit(true);
    setFormData({
      name: project.name,
      description: project.description || "",
      url: project.url || "",
      files: [],
    });
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      setDeleteId(null);
      await fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="mx-auto py-10 px-4 space-y-6">
      {/* Header & Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Projects Management</h2>
        <Dialog
          open={open}
          onOpenChange={(open) => {
            if (!open) resetForm();
            setOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>+ Create Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edit Project" : "Create New Project"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Project URL</label>
                <Input
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Project Images</label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const selectedFiles = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    setFormData((prev) => ({ ...prev, files: selectedFiles }));
                  }}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Processing..." : isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    {project.description || (
                      <span className="text-muted-foreground">
                        No description
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Visit
                      </a>
                    ) : (
                      <span className="text-muted-foreground">No URL</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {Array.isArray(project.image) &&
                    project.image.length > 0 ? (
                      <div className="flex gap-2">
                        {project.image.map((imgUrl, idx) => (
                          <img
                            key={idx}
                            src={imgUrl}
                            alt={project.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No image</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(project.createdAt), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                        disabled={loading}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeleteId(project.id)}
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure to delete this project?
                            </AlertDialogTitle>
                            <p className="text-sm text-muted-foreground">
                              This action cannot be undone.
                            </p>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => setDeleteId(null)}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={confirmDelete}
                              disabled={loading}
                            >
                              {loading ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No projects found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
