import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const all = url.searchParams.get("all") === "true"; // cek query all
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "5");
    const skip = (page - 1) * limit;
    const search = url.searchParams.get("search") || "";

    let projects, total;

    if (all) {
      // Ambil semua project tanpa limit
      projects = await prisma.project.findMany({
        orderBy: { createdAt: "asc" },
      });
      total = projects.length;
    } else {
      // Ambil dengan pagination
      [projects, total] = await Promise.all([
        prisma.project.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: "asc" },
        }),
        prisma.project.count(),
      ]);
    }

    return NextResponse.json({ projects, total });
  } catch (error) {
    console.error("❌ Failed to fetch projects:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch projects",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

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

    // Ambil semua files (array), fallback ke array kosong
    const files = formData.getAll("image") as (File | Blob)[];

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { message: `You can upload up to ${MAX_FILES} images only.` },
        { status: 400 }
      );
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      // Validasi file tipe image dan ukuran
      if (
        file &&
        "type" in file &&
        file.type.startsWith("image/") &&
        (file as File).size <= MAX_FILE_SIZE
      ) {
        const fileName = `${Date.now()}-${
          (file as File & { name?: string }).name ?? "upload.jpg"
        }`;

        console.log("📤 Uploading file:", {
          name: (file as File & { name?: string }).name,
          type: file.type,
          size: (file as File).size,
        });

        // Upload ke Supabase
        const { error: uploadError } = await supabase.storage
          .from("imagesproject")
          .upload(fileName, file as Blob, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          continue; // skip file gagal
        }

        const { data: imageData } = supabase.storage
          .from("imagesproject")
          .getPublicUrl(fileName);

        if (imageData?.publicUrl) imageUrls.push(imageData.publicUrl);
      } else {
        console.warn("Skipped file due to size/type limit:", file);
      }
    }

    // Generate slug dari nama project
    const slug = slugify(name);

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        url,
        image: imageUrls,
        slug,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("❌ Failed to create project:", error);
    return NextResponse.json(
      { message: "❌ Failed to create project", error: String(error) },
      { status: 500 }
    );
  }
}
