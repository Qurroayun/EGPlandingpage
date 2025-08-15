"use client";

import SplashScreen from "@/components/animation/splashscreen/SplashScreen";
import SectionLanding from "@/components/section/SectionLanding";
import { useEffect, useState } from "react";
import SectionAbout from "./about/SectionAbout";
import SectionContact from "./contact/SectionContact";
import SectionProjects from "./projects/SectionProject";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const splashDown = localStorage.getItem("splashScreenShown");
    if (splashDown === "true") {
      setLoading(true);
    }
  }, []);

  const handleFinishSplash = () => {
    localStorage.setItem("splashScreenShown", "true");
    setLoading(false);
  };

  // Tampilkan SplashScreen saat loading = true,
  // dan setelah selesai tampilkan konten utama
  if (loading) {
    return <SplashScreen onFinish={handleFinishSplash} />;
  }

  return (
    <main className="">
      <SectionLanding />
      <div className="mt-5 md:mt-10">
        <SectionProjects />
      </div>
      <div className="">
        <SectionAbout />
      </div>
      <div className="">
        <SectionContact />
      </div>
    </main>
  );
}
