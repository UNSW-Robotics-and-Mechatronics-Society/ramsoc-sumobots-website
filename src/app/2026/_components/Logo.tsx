import Link from "next/link";
import Image from "next/image";
import logos, { LogoKey } from "@/app/2026/_data/logos";

type LogoProps = {
  logoName: LogoKey;
  size?: number;
  className?: string;
  disableLink?: boolean;
  fit?: boolean;
};

const Logo = ({ logoName, size, className, disableLink, fit }: LogoProps) => {
  const logoData = logos[logoName];
  const content = fit ? (
    <div className="relative h-full w-full">
      <Image
        src={logoData.image_url}
        alt={logoData.label}
        fill
        sizes="(min-width: 640px) 256px, 192px"
        className="object-contain"
      />
    </div>
  ) : (
    <Image
      src={logoData.image_url}
      alt={logoData.label}
      width={logoData.width}
      height={logoData.height}
      className="h-full w-auto"
    />
  );

  return disableLink ? (
    <div
      className={className}
      style={{ width: size ? `${size}px` : undefined }}
    >
      {content}
    </div>
  ) : (
    <Link
      href={logoData.href}
      className={className}
      style={{ width: size ? `${size}px` : undefined }}
      target="_blank"
    >
      {content}
    </Link>
  );
};

export default Logo;
