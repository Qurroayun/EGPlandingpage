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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

interface Project {
  id: string;
  name: string;
  description?: string;
  url?: string;
  image?: string[];
  slug: string;
  createdAt: string;
}

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const PAGE_SIZE = 5;

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
    files: [] as File[],
  });

  const [errors, setErrors] = useState({ name: "", files: "" });

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`/api/projects?page=${page}&limit=${PAGE_SIZE}`);
      if (!res.ok) throw new Error("Failed to fetch projects");

      const data: { projects: Project[]; total: number } = await res.json();
      setProjects(data.projects);
      setTotalPages(Math.ceil(data.total / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const resetForm = () => {
    setFormData({ name: "", description: "", url: "", files: [] });
    setErrors({ name: "", files: "" });
    setIsEdit(false);
    setCurrentProject(null);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setErrors({ ...errors, name: "Project name is required" });
      return;
    }

    if (formData.files.length === 0 && !isEdit) {
      setErrors({ ...errors, files: "Please upload at least 1 image" });
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
    setErrors({ name: "", files: "" });
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

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      let newErrors = "";

      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          newErrors += `${file.name} is larger than 5MB. `;
          return false;
        }
        return true;
      });

      if (validFiles.length + formData.files.length > MAX_FILES) {
        newErrors += `You can upload maximum ${MAX_FILES} files.`;
      }

      if (newErrors) {
        setErrors({ ...errors, files: newErrors });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...validFiles].slice(0, MAX_FILES),
      }));

      setErrors({ ...errors, files: "" });
    },
    [formData.files, errors]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxSize: MAX_FILE_SIZE,
  });

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
            {/* Form Fields */}
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
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-50"
                >
                  <input {...getInputProps()} />
                  {formData.files.length > 0 ? (
                    <p>{formData.files.length} file(s) selected</p>
                  ) : (
                    <p>Drag & drop images here, or click to select files</p>
                  )}
                </div>
                {errors.files && (
                  <p className="text-red-500 text-sm">{errors.files}</p>
                )}

                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.files.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-full flex justify-end pt-6">
          <Pagination className="!justify-end">
            <PaginationPrevious
              onClick={() => page > 1 && setPage(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setPage(i + 1)}
                    className={page === i + 1 ? "bg-gray-700 text-white" : ""}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
            <PaginationNext
              onClick={() => page < totalPages && setPage(page + 1)}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}
