// src/app/api/business-category/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ harus di-await

  const body = await req.json();
  const { name } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Nama harus diisi" }, { status: 400 });
  }

  const slug = slugify(name);

  const updated = await prisma.businessCategory.update({
    where: { id },
    data: { name, slug },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ juga di-await

  await prisma.businessCategory.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
