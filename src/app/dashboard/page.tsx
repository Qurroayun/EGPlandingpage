"use client";

import { useEffect, useState } from "react";
import { FaBriefcase, FaProjectDiagram, FaTags } from "react-icons/fa";

export default function DashboardPage() {
  const [dateTime, setDateTime] = useState("");
  const [stats, setStats] = useState({
    business: 0,
    category: 0,
    project: 0,
  });

  // Update waktu real-time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setDateTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ambil data dari API
  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("");
      const data = await res.json();
      setStats(data);
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome to Dashboard</h1>
        <p className="text-lg text-muted-foreground">{dateTime}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Our Business"
          value={stats.business.toString()}
          icon={<FaBriefcase className="w-8 h-8 text-primary" />}
        />
        <Card
          title="Our Category"
          value={stats.category.toString()}
          icon={<FaTags className="w-8 h-8 text-yellow-500" />}
        />
        <Card
          title="Our Project"
          value={stats.project.toString()}
          icon={<FaProjectDiagram className="w-8 h-8 text-green-500" />}
        />
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:scale-[1.03] dark:hover:bg-gray-800 hover:bg-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">Total {title}:</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
