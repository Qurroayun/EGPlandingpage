import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/utils/slugify";
import { NextRequest, NextResponse } from "next/server";

// GET by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error("❌ Failed to fetch project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT / update project
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;

    if (!name) {
      return NextResponse.json(
        { message: "Project name is required" },
        { status: 400 }
      );
    }

    const MAX_FILES = 5;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const files = formData.getAll("image") as (File | Blob)[];

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { message: `You can upload up to ${MAX_FILES} images only.` },
        { status: 400 }
      );
    }

    // Ambil existing project
    const existingProject = await prisma.project.findUnique({ where: { id } });
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    let imageUrls: string[] = [];

    if (files.length > 0) {
      // Upload file baru
      for (const file of files) {
        if (
          file &&
          "type" in file &&
          file.type.startsWith("image/") &&
          (file as File).size <= MAX_FILE_SIZE
        ) {
          const fileName = `${Date.now()}-${
            (file as File & { name?: string }).name ?? "upload.jpg"
          }`;

          const { error: uploadError } = await supabase.storage
            .from("imagesproject")
            .upload(fileName, file as Blob, {
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) {
            console.error("Upload error:", uploadError.message);
            continue;
          }

          const { data: imageData } = supabase.storage
            .from("imagesproject")
            .getPublicUrl(fileName);

          if (imageData?.publicUrl) imageUrls.push(imageData.publicUrl);
        } else {
          console.warn("Skipped file due to size/type limit:", file);
        }
      }
    } else {
      // Tidak ada file baru → pakai image lama
      imageUrls = Array.isArray(existingProject.image)
        ? [...existingProject.image]
        : existingProject.image
        ? [existingProject.image]
        : [];
    }

    // Update project
    const updated = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        url,
        image: imageUrls,
        slug: slugify(name),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Failed to update project:", error);
    return NextResponse.json(
      { message: "Failed to update project", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Hapus semua image dari Supabase Storage
    if (Array.isArray(project.image) && project.image.length > 0) {
      const fileNames = project.image
        .map((url) => url.split("/").pop()!)
        .filter(Boolean);

      if (fileNames.length > 0) {
        await supabase.storage.from("imagesproject").remove(fileNames);
      }
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Failed to delete project:", error);
    return NextResponse.json(
      { message: "Failed to delete project", error: String(error) },
      { status: 500 }
    );
  }
}
