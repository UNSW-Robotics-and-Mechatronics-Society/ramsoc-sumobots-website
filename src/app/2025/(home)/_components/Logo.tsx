import Link from "next/link";
import Image from "next/image";
import { LogoData, LogoKeys } from "@/app/2025/_data/LogoData";

type LogoProps = {
  logoName: LogoKeys;
  size: number;
  className?: string;
};

const Logo = ({ logoName, size, className }: LogoProps) => {
  const logoData = LogoData[logoName];
  return (
    <Link
      href={logoData.href}
      className={className}
      style={{ width: size ? `${size}px` : undefined }}
      target="_blank"
    >
      <Image
        src={logoData.image_url}
        alt={logoData.name}
        width={96}
        height={96}
      />
    </Link>
  );
};

export default Logo;
