import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BusinessItemDetail({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;

  const item = await prisma.business.findUnique({
    where: { id },
  });

  if (!item) return notFound();

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href={`/subsidiariesandinvesment/${slug}`}>
        <Button
          variant="outline"
          className="transition-all duration-300 hover:scale-[1.03] 
                      bg-background text-foreground hover:bg-accent hover:text-accent-foreground
                      dark:bg-[#1e1e1e] dark:hover:bg-[#2e2e2e]"
        >
          Back to {slug}
        </Button>
      </Link>

      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-4">{item.name}</h1>

        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            width={600}
            height={400}
            className="rounded-lg shadow-md mb-6"
            priority
          />
        )}

        <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
      </div>
    </div>
  );
}
