"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setServerError("");

    if (!form.email) {
      setEmailError("Email tidak boleh kosong.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      setEmailError("Format email tidak valid.");
      valid = false;
    }

    if (!form.password) {
      setPasswordError("Password tidak boleh kosong.");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // wajib untuk cookie!
      });

      const data = await res.json();

      if (res.ok) {
        // ⏳ Tunggu 100ms agar cookie benar-benar tersimpan sebelum redirect
        setTimeout(() => {
          // router.push("/dashboard");
          router.push("/dashboard");
          router.refresh();
        }, 100);
      } else {
        if (data.message?.toLowerCase().includes("email")) {
          setEmailError(data.message);
        } else if (data.message?.toLowerCase().includes("password")) {
          setPasswordError(data.message);
        } else {
          setServerError(data.message || "Login gagal.");
        }
      }
    } catch (error) {
      setServerError("Terjadi kesalahan saat login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <div className="space-y-4">
        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2"
            placeholder="your@email.com"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-2"
            placeholder="******"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <p className="text-red-500 text-sm mt-1">{serverError}</p>
        )}

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>

      <p className="text-sm mt-4 text-center">
        Belum punya akun?{" "}
        <Link href="/auth/register" className="underline text-blue-600">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
