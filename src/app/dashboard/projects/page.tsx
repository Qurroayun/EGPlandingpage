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
  image?: string;
  slug: string;
  createdAt: string;
}

export default function ProjectsPage() {
  // State untuk data dan UI
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // State untuk form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    image: "https://via.placeholder.com/300",
  });

  // State untuk error handling
  const [errors, setErrors] = useState({
    name: "",
  });

  // Fetch data projects
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

  // Reset form ke keadaan awal
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      url: "",
      image: "https://via.placeholder.com/300",
    });
    setErrors({ name: "" });
    setIsEdit(false);
    setCurrentProject(null);
  };

  // Handle submit form (create/update)
  const handleSubmit = async () => {
    // Validasi form
    if (!formData.name.trim()) {
      setErrors({ name: "Project name is required" });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        url: formData.url.trim(),
        image: formData.image,
      };

      const url =
        isEdit && currentProject
          ? `/api/projects/${currentProject.id}`
          : "/api/projects";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
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

  // Handle edit project
  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEdit(true);
    setFormData({
      name: project.name,
      description: project.description || "",
      url: project.url || "",
      image: project.image || "",
    });
    setOpen(true);
  };

  // Handle delete project
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      setDeleteId(null);
      await fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  // Handle upload image
  const handleImageUpload = async (file: File) => {
    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="mx-auto py-10 px-4 space-y-6 ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Projects Management</h2>

        {/* Dialog Trigger */}
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

          {/* Dialog Content */}
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edit Project" : "Create New Project"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Project Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <Input
                  placeholder="Enter project name"
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
              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Enter project description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                />
              </div>
              {/* URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Project URL</label>
                <Input
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                />
              </div>
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  disabled={imageUploading}
                />
                {imageUploading && (
                  <p className="text-sm text-muted-foreground">
                    Uploading image...
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || imageUploading}
                >
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
              <TableHead>Image</TableHead>
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
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-muted-foreground">No image</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(project.createdAt), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* Edit Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                        disabled={loading}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {/* Delete Button */}
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
