"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

export default function BusinessCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/subsidiariesandinvesment-category");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Business</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/subsidiariesandinvesment/${cat.id}`}
            className="border rounded-xl p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{cat.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
