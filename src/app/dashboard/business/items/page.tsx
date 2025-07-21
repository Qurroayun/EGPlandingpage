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

interface Category {
  id: string;
  name: string;
}

interface BusinessItem {
  id: string;
  name: string;
  image: string;
  description: string;
  createdAt: string;
  category: {
    name: string;
  };
}

export default function BusinessItemPage() {
  const [items, setItems] = useState<BusinessItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingItem, setEditingItem] = useState<BusinessItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [descError, setDescError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    categoryId?: string;
  }>({});

  const fetchItems = async () => {
    const res = await fetch("/api/business-item");
    if (res.ok) {
      const data = await res.json();
      setItems(data);
    }
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/business-category");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setImage("");
    setDescription("");
    setCategoryId("");
    setImageUrl("");
    setImageFile(null);
    setIsEdit(false);
    setEditingItem(null);

    setNameError("");
    setImageError("");
    setDescError("");
    setCategoryError("");
  };

  const handleSubmit = async () => {
    const currentImage = image || imageUrl || "https://via.placeholder.com/300";

    const newErrors: typeof errors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!categoryId) newErrors.categoryId = "Category is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      name,
      image: currentImage,
      description,
      categoryId,
    };

    if (isEdit && editingItem) {
      await fetch(`/api/business-item/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/business-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setOpen(false);
    resetForm();
    fetchItems();
  };

  const handleEdit = (item: BusinessItem) => {
    setEditingItem(item);
    setIsEdit(true);
    setName(item.name);
    setImage(item.image);
    setDescription(item.description);
    setCategoryId(
      categories.find((c) => c.name === item.category.name)?.id || ""
    );
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/business-item/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    fetchItems();
  };

  return (
    <div className="mx-auto py-10 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Business Items</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>+ Add Item</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit" : "Add"} Business Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Name Input */}
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

              {/* File Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setImageFile(file);
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await res.json();
                  setImageUrl(data.url);
                  setImage(data.url);
                }}
                className="border px-3 py-2 rounded w-full text-sm"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              )}

              {/* Description */}
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors((prev) => ({ ...prev, description: undefined }));
                }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}

              {/* Category Select */}
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setErrors((prev) => ({ ...prev, categoryId: undefined }));
                }}
                className="w-full border px-3 py-2 rounded dark:text-white dark:bg-black"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm">{errors.categoryId}</p>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {isEdit ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground italic">
                      No image
                    </span>
                  )}
                </TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {item.description}
                </TableCell>
                <TableCell>
                  {format(new Date(item.createdAt), "dd MMM yyyy")}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" onClick={() => handleEdit(item)}>
                    <Pencil size={16} />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure to delete?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteId(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>
                          Yes, Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
