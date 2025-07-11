import Link from "next/link";
import { Button } from "../ui/button";

export default function SectionLanding() {
  return (
    <div className="container mx-auto">
      <h1 className="text-5xl text-start p-5">
        Evindo Global Putra Is Holding Company
      </h1>
      <div className="flex flex-col md:p-10 p-5">
        <p className="text-3xl">Innovative Support and Solution</p>
        <p className="mt-5 text-2xl">
          We responds to diverse of our partner needs in variety business
          fields.
        </p>
        <p className="text-2xl"> Building system and drive innovation</p>
      </div>
      <div className="p-5 md:p-10">
        <Link href="www.google.com" target="_blank">
          <Button size="sm" variant="outline">
            Find Us{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
}
