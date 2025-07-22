import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.business.findMany({
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const { name, description, categoryId, image } = await request.json();

  if (!name || !categoryId) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const item = await prisma.business.create({
    data: {
      name,
      description,
      categoryId,
      image: image || "https://via.placeholder.com/300",
    },
  });

  return NextResponse.json(item);
}
