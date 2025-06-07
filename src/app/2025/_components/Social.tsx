import socials, { SocialKey } from "@/app/2025/_data/socials";
import Link from "next/link";

type SocialProps = {
  socialName: SocialKey;
  size?: number;
  className?: string;
  variant?: "default" | "pill";
};

const Social = ({
  socialName,
  size = 24,
  variant = "default",
  className,
}: SocialProps) => {
  const socialData = socials[socialName];

  if (variant === "pill") {
    return (
      <Link
        href={socialData.href}
        className={`flex items-center justify-between gap-2 rounded-full bg-white px-4 py-2 text-center text-gray-950 hover:text-gray-600 ${className}`}
        target="_blank"
      >
        {socialData.icon(size)}
        <span className="text-sm">{socialData.label}</span>
      </Link>
    );
  }
  return (
    <Link
      href={socialData.href}
      className={`hover:text-gray-400 ${className}`}
      target="_blank"
    >
      {socialData.icon(size)}
    </Link>
  );
};

export default Social;
