import { prisma } from "@/lib/prisma";
import { Business } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BusinessItemsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.businessCategory.findUnique({
    where: { slug },
  });

  if (!category) return notFound();

  const items: Business[] = await prisma.business.findMany({
    where: { categoryId: category.id },
    orderBy: { createdAt: "desc" },
  });

  const formatTanggal = (date: Date | string) => {
    const tanggal = typeof date === "string" ? new Date(date) : date;

    return tanggal.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">Belum ada item untuk kategori ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/subsidiariesandinvesment/${slug}/${item.id}`}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <Image
                src={item.image || "https://via.placeholder.com/300"}
                alt={item.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                {" "}
                {formatTanggal(item.createdAt)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
