import { SponsorData } from "@/app/2025/_data/SponsorsData";
import Logo from "./Logo";
import { LogoData, LogoKey } from "../../_data/LogoData";
import Link from "next/link";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

interface SponsorCardProps {
  logoName: LogoKey;
}

export const SponsorCard = ({ logoName }: SponsorCardProps) => {
  const logoData = LogoData[logoName];
  return (
    <Link
      className="relative flex h-40 w-48 items-center justify-center rounded-sm border border-gray-700 p-4 transition-transform duration-200 hover:scale-105 sm:h-52 sm:w-64 sm:p-5"
      style={{ backgroundColor: logoData.bg_color }}
      href={logoData.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={logoData.label}
    >
      <div className="bg-secondary/50 absolute top-0 right-0 m-2 rounded-sm">
        <LuSquareArrowOutUpRight className="text-primary size-5" />
      </div>
      <Logo logoName={logoName} className="h-full" disableLink />
    </Link>
  );
};

export const Sponsors = () => {
  return (
    <section id="sponsor" className="container">
      <h2>Thank you to our sponsors!</h2>
      <div className="flex flex-col justify-center gap-5">
        <p>
          Our sponsors allow us to host hundreds of students every year and
          provide them with great learning opportunities and fun experiences.
        </p>
        {SponsorData && SponsorData.length > 0 && (
          <div className="flex items-center justify-center">
            <div className="grid w-fit grid-cols-1 items-center justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SponsorData.map((name) => (
                <SponsorCard key={name} logoName={name} />
              ))}
            </div>
          </div>
        )}
        <p>
          If you would like to help us do the same this year, contact us at{" "}
          <a className="text-link" href="mailto:industry@ramsocunsw.org">
            industry@ramsocunsw.org
          </a>
          , today!
        </p>
      </div>
    </section>
  );
};
