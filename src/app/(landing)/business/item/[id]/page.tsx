import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

// ❗ Next.js 15: gunakan `params` sebagai Promise dan await di dalamnya
export default async function BusinessItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await prisma.business.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!item) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Kategori: {item.category?.name}
      </p>

      {item.image && (
        <Image
          src={item.image}
          alt={item.name}
          width={800}
          height={400}
          className="w-full h-80 object-cover rounded mb-6"
          priority
        />
      )}

      <p className="text-lg leading-relaxed">{item.description}</p>
    </div>
  );
}
