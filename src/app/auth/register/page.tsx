// app/auth/register/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Register berhasil!");
      router.push("/auth/login");
    } else {
      const { error } = await res.json();
      toast.error(error || "Register gagal!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 border p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-2"
          />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>

        <p className="text-sm mt-4 text-center">
          Sudah Memiliki Akun ?{" "}
          <Link href="/auth/login" className="underline text-blue-600">
            Login sekarang
          </Link>
        </p>
      </form>
    </div>
  );
}
