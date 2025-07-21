import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

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

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const body = await req.json();
    const { name, description, url, image } = body;
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        url,
        image,
        slug: name ? name.toLowerCase().replace(/\s+/g, "-") : undefined,
      },
    });
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error({ message: "❌ Failed to update project:" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error({ message: "❌ Failed to delete project:" }, { status: 500 });
  }
}
