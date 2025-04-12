import Link from "next/link";
import Image from "next/image";
import { LogoData, LogoKey } from "@/app/2025/_data/LogoData";

type LogoProps = {
  logoName: LogoKey;
  size?: number;
  className?: string;
  disableLink?: boolean;
};

const Logo = ({ logoName, size, className, disableLink }: LogoProps) => {
  const logoData = LogoData[logoName];
  const content = (
    <Image
      src={logoData.image_url}
      alt={logoData.label}
      width={96}
      height={96}
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
