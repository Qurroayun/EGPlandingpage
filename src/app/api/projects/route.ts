import { prisma } from "@/lib/prisma";
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
    const { name, description, url, image } = await request.json();

    if (!name) {
      return NextResponse.json(
        { message: "Project name is required" },
        { status: 400 }
      );
    }

    const slug = slugify(name);
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        url,
        image: image || "https://via.placeholder.com/300",
        slug,
      },
    });
    console.log(newProject);

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("❌ Failed to create project:", error);
    return NextResponse.json(
      { message: "❌ Failed to create project", error: String(error) },
      { status: 500 }
    );
  }
}
