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
    const file = formData.get("image");

    const existingProject = await prisma.project.findUnique({ where: { id } });
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    let imageUrl = existingProject.image;

    // Jika ada file baru, upload dan update image
    if (file && file instanceof File && file.type.startsWith("image/")) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("imagesproject")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        return NextResponse.json(
          { message: "Failed to upload image" },
          { status: 500 }
        );
      }

      const { data: imageData } = supabase.storage
        .from("imagesproject")
        .getPublicUrl(fileName);

      imageUrl = imageData.publicUrl;

      // Optional: Hapus gambar lama jika berbeda
      if (existingProject.image) {
        const oldPath = existingProject.image.split("/").pop(); // ambil filename
        await supabase.storage.from("imagesproject").remove([oldPath!]);
      }
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        url,
        image: imageUrl,
        slug: slugify(name),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Failed to update project:", error);
    return NextResponse.json(
      { message: "Failed to update project" },
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

    // Hapus image dari Supabase Storage
    if (project.image) {
      const fileName = project.image.split("/").pop();
      await supabase.storage.from("imagesproject").remove([fileName!]);
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Failed to delete project:", error);
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
