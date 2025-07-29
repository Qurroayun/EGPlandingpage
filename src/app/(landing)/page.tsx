import SectionLanding from "@/components/section/SectionLanding";
import SectionAbout from "./about/SectionAbout";
import SectionContact from "./contact/SectionContact";
import SectionProjects from "./projects/SectionProject";

export default function Home() {
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
