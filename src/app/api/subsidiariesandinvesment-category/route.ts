import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const slug = slugify(name);

    const existingCategory = await prisma.businessCategory.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    const newCategory = await prisma.businessCategory.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(newCategory);
  } catch (error: any) {
    console.error("❌ POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.businessCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json("Failed to fetch categories", { status: 500 });
  }
}
