import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projectsCount = await prisma.project.count();
    const subsidiariesandinvesmentCount = await prisma.business.count();
    const categoryCount = await prisma.businessCategory.count();

    return NextResponse.json({
      project: projectsCount,
      subsidiariesandinvesment: subsidiariesandinvesmentCount,
      category: categoryCount,
    });
  } catch (error) {
    console.log("Error fetching stats:", error);
    return NextResponse.json({
      error: "Failed to fetch stats",
    });
  }
}
