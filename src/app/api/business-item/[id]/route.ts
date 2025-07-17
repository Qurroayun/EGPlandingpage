// src/app/api/business-item/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ GUNAKAN Promise DI PARAM TYPE
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ harus pakai await
    const { name, description, image, categoryId } = await req.json();

    const updated = await prisma.business.update({
      where: { id },
      data: { name, description, image, categoryId },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /business-item/[id] error:", error);
    return NextResponse.json({ error: "Gagal update item" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.business.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /business-item/[id] error:", error);
    return NextResponse.json({ error: "Gagal hapus item" }, { status: 500 });
  }
}
