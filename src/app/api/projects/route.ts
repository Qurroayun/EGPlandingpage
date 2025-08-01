import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc" as const, // Type assertion untuk Prisma
      },
    });
    return NextResponse.json(projects);
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

    const file = formData.get("image");

    if (!name) {
      return NextResponse.json(
        { message: "Project name is required" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (
      file &&
      typeof file === "object" &&
      "type" in file &&
      file.type?.startsWith("image/")
    ) {
      // file.name tidak dijamin ada, jadi fallback aman
      const fileName = `${Date.now()}-${
        (file as Blob & { name?: string }).name ?? "upload.jpg"
      }`;

      console.log("📤 File info:", {
        name: (file as Blob & { name?: string }).name,
        type: file.type,
        size: file.size,
      });

      const { error: uploadError } = await supabase.storage
        .from("imagesproject")
        .upload(fileName, file as Blob, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        return NextResponse.json(
          { message: "Failed to upload image", error: uploadError.message },
          { status: 500 }
        );
      }

      const { data: imageData } = supabase.storage
        .from("imagesproject")
        .getPublicUrl(fileName);

      imageUrl = imageData.publicUrl;
    }

    const slug = slugify(name);
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        url,
        image: imageUrl,
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
