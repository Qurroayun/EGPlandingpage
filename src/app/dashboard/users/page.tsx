"use client";

import { Button } from "@/components/ui/button";
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
    const res = await fetch("/api/user/", {
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

    const res = await fetch("/api/user/password", {
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
      setSuccessMsg("Nama berhasil diperbarui");
      setOpenNameDialog(false);
    } else {
      const data = await res.json();
      setError(data.error || "Gagal update password");
    }
  };

  if (!user) return <div className="p-4">Memuat...</div>;

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold">Profil Anda</h2>

      <div>
        <Label>Nama</Label>
        <Input value={user.name} readOnly className="cursor-default" />
      </div>

      <div>
        <Label>Email</Label>
        <Input value={user.email} readOnly className="cursor-default" />
      </div>

      <div className="flex gap-2">
        {/* Dialog Ganti Nama */}
        <Dialog open={openNameDialog} onOpenChange={setOpenNameDialog}>
          <DialogTrigger asChild>
            <Button>Ganti Nama</Button>
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
        <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">Ganti Password</Button>
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
      </div>

      {successMsg && <div className="text-green-600">{successMsg}</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
