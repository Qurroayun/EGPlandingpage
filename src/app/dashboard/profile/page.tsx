"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

export default function UserProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [newName, setNewName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setNewName(data.user.name);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateName = async () => {
    setError("");
    const res = await fetch("/api/profile/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (res.ok) {
      setUser((prev) => prev && { ...prev, name: newName });
      setSuccessMsg("Nama berhasil diperbarui");
      setOpenNameDialog(false);
    } else {
      const data = await res.json();
      setError(data.error || "Gagal update nama");
    }
  };

  const handleChangePassword = async () => {
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    const res = await fetch("/api/profile/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (res.ok) {
      const me = await fetch("/api/me");
      if (me.ok) {
        const data = await me.json();
        setUser(data.user);
      }
      setSuccessMsg("Password berhasil diperbarui");
      setOpenPasswordDialog(false);
    } else {
      const data = await res.json();
      setError(data.error || "Gagal update password");
    }
  };

  if (!user) return <div className="p-4">Memuat...</div>;

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">Profile Anda</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kiri: Informasi user */}
        <Card className="dark:bg-black">
          <CardContent className="flex items-center gap-4 py-6 ">
            <img
              src="/globe.svg"
              alt="User Avatar"
              className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-950"
            />
            <div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Kanan: Aksi (button ganti nama & password) */}
        <Card className="dark:bg-black">
          <CardContent className="flex flex-col md:flex-col-2 gap-3 py-6 items-start">
            {/* Dialog Ganti Nama */}
            <Dialog open={openNameDialog} onOpenChange={setOpenNameDialog}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">Ganti Nama</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ganti Nama</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Label>Nama Baru</Label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleUpdateName}>Simpan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Dialog Ganti Password */}
            <Dialog
              open={openPasswordDialog}
              onOpenChange={setOpenPasswordDialog}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  Ganti Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ganti Password</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Label>Password Saat Ini</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <Label>Password Baru</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Label>Konfirmasi Password Baru</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleChangePassword}>Simpan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Status Message */}
      <div className="mt-4">
        {successMsg && <p className="text-green-600">{successMsg}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
