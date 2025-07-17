"use client";

import { Button } from "@/components/ui/button"; // jika pakai shadcn
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant="outline" className="mb-4">
      ← Back
    </Button>
  );
}
