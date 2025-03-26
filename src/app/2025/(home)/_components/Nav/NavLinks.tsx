import NavLinkData from "@/app/2025/_data/NavLinkData";
import NavLinkType from "@/app/_types/NavLinkData";
import Link from "next/link";
import { useState } from "react";

type NavLinkProps = NavLinkType & {
  className?: string;
};

const NavLink = ({
  name,
  label,
  href = "",
  color = "default",
  size = "default",
  dropdown,
  className,
}: NavLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = href === "" && !dropdown;

  const colorClasses = {
    default: "text-white",
    white: "bg-white text-black",
    disabled: "text-gray-400 cursor-not-allowed opacity-50",
  };
  const sizeClasses = {
    default: "px-4",
    sm: "px-2",
    lg: "px-4 py-2",
  };

  const variantClass = isDisabled
    ? colorClasses["disabled"]
    : colorClasses[color] || colorClasses.default;
  const sizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div
      className={`relative ${!!dropdown ? "group" : ""} ${variantClass} ${className}`}
    >
      {!dropdown ? (
        isDisabled ? (
          <span
            className={`flex items-center ${sizeClass}`}
            aria-disabled="true"
          >
            {name}
          </span>
        ) : (
          <Link
            href={href}
            className={`flex items-center ${sizeClass} hover:underline`}
            aria-label={label}
          >
            {name}
          </Link>
        )
      ) : (
        <div
          className={`flex items-center ${sizeClass}`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {name}
        </div>
      )}

      {dropdown && isOpen && (
        <div
          className="absolute right-0 flex flex-col gap-2 rounded-l-md bg-gray-300 p-2 text-black"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {dropdown.map((subLink) => (
            <NavLink
              key={subLink.name}
              color={color}
              {...subLink}
              size="sm"
              className="w-48 bg-gray-300 text-black"
            />
          ))}
        </div>
      )}
    </div>
  );
};

type NavLinksProps = {
  size?: NavLinkType["size"];
  orientation?: "horizontal" | "vertical" | "wrap";
  className?: string;
};

const NavLinks = ({
  size = "default",
  orientation = "horizontal",
  className,
}: NavLinksProps) => {
  const orientationClasses = {
    horizontal: "flex space-x-4",
    vertical: "flex flex-col space-y-2",
    wrap: "flex flex-wrap space-x-2",
  };
  const orientationClass =
    orientationClasses[orientation] || orientationClasses.horizontal;

  return (
    <nav className={`${orientationClass} ${className}`}>
      {NavLinkData.map((navLink) => (
        <NavLink key={navLink.name} {...navLink} size={size} />
      ))}
    </nav>
  );
};

export default NavLinks;
