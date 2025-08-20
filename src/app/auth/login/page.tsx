"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"; // 🧠 PENTING
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

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      // tangkap error umum dari credentials provider
      if (res?.error?.toLowerCase().includes("credentials")) {
        setServerError("Email atau password salah.");
      } else {
        setServerError("Terjadi kesalahan saat login.");
      }
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

      {/* <p className="text-sm mt-4 text-center">
        Belum punya akun?{" "}
        <Link href="/auth/register" className="underline text-blue-600">
          Daftar sekarang
        </Link>
      </p> */}
    </div>
  );
}
