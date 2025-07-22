import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

// Helper untuk mendapatkan session di server component
export async function getAuthSession() {
  return await getServerSession(authOptions);
}

// Helper untuk proteksi halaman
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  return session;
}
