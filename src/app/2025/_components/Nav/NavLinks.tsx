import navItems, { NavItem } from "@/app/2025/_data/navItems";
import useIsMobile from "@/app/2025/hooks/useIsMobile";
import Link from "next/link";
import MenuToggler from "./MenuToggler";
import { AnimatePresence, motion, useCycle, Variants } from "framer-motion";
import { LuChevronsUpDown } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";

type NavLinkProps = NavItem & {
  className?: string;
  onClick?: () => void;
};

const NavLink = ({
  name,
  label,
  href,
  color = "default",
  dropdown,
  isDisabled: isDisabledProp,
  onClick: onClickProp,
  className,
}: NavLinkProps) => {
  const isDropdown = !!dropdown && dropdown.length > 0;
  const isDisabled = isDisabledProp || (!isDropdown && !href);
  const onClick = isDisabled ? undefined : onClickProp;
  const [openDropdown, setOpenDropdown] = useState(false);
  const isMobile = useIsMobile();

  const colorClasses = {
    default: "text-white",
    white: "bg-white text-black",
    disabled: "text-gray-400 cursor-not-allowed opacity-50",
  };

  const variantClass = isDisabled
    ? colorClasses["disabled"]
    : colorClasses[color] || colorClasses.default;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenDropdown]);

  if (isDropdown) {
    return (
      <div
        className="relative flex flex-col"
        ref={dropdownRef}
        onMouseEnter={() => !isMobile && setOpenDropdown(true)}
        onMouseLeave={() => !isMobile && setOpenDropdown(false)}
      >
        <motion.button
          className={`${variantClass} flex items-center justify-between gap-1 px-4 py-2 text-start ${
            openDropdown && !!href && "hover:underline"
          } ${className || ""} rounded-xs border border-gray-300/50`}
          variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
        >
          {openDropdown && !!href ? (
            <Link
              href={href}
              aria-label={label}
              className="flex w-full items-center justify-between"
            >
              {name}
            </Link>
          ) : (
            <>{name}</>
          )}
          <div
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="rounded-xs border border-gray-300/30 p-1"
          >
            <LuChevronsUpDown />
          </div>
        </motion.button>

        <AnimatePresence>
          {openDropdown && (
            <div
              className={`${
                isMobile ? "relative" : "absolute top-full right-0"
              } z-50 pt-2`}
            >
              <motion.div
                className="flex min-w-max flex-col gap-1 rounded-lg border border-gray-300/50 bg-black/90 p-2 whitespace-nowrap"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  closed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4 }}
                initial="closed"
                animate="open"
                exit="closed"
                viewport={{ once: true }}
              >
                {dropdown.map((navLink) => (
                  <NavLink key={navLink.name} {...navLink} />
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (isDisabled) {
    return (
      <motion.button
        className={`${variantClass} flex items-center justify-between px-4 py-2 text-start ${className || ""}`}
        variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
        disabled
      >
        {name}
      </motion.button>
    );
  }
  return (
    <motion.button
      className={`${variantClass} flex items-center justify-between px-4 py-2 text-start hover:underline ${className || ""}`}
      variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
      onClick={onClick}
    >
      <Link href={href || ""} aria-label={label}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
            staggerChildren: 0.05,
            duration: 0.5,
          }}
        >
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </Link>
    </motion.button>
  );
};

const sidebarVariants: Variants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.4,
      delay: 0.25,
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

type NavLinksProps = {
  orientation?: "horizontal" | "vertical" | "wrap";
  className?: string;
};

const NavLinks = ({ orientation = "horizontal", className }: NavLinksProps) => {
  const orientationClasses = {
    horizontal: "flex gap-x-4",
    vertical: "flex flex-col gap-y-2",
    wrap: "flex flex-wrap gap-x-2",
  };
  const orientationClass =
    orientationClasses[orientation] || orientationClasses.horizontal;

  const isMobile = useIsMobile();
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <>
      <motion.nav
        className={`${orientationClass} ${className}`}
        animate={isOpen || !isMobile ? "open" : "closed"}
      >
        {isMobile ? (
          <MenuToggler onClickMenu={() => toggleOpen()} className="z-50 p-4" />
        ) : (
          navItems.map((navLink) => <NavLink key={navLink.name} {...navLink} />)
        )}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed top-16 right-0 z-40 flex max-h-[90vh] w-72 flex-col gap-4 overflow-y-auto rounded-lg border border-gray-300/50 bg-black/90 p-6"
              variants={sidebarVariants}
              onClick={(e) => e.stopPropagation()}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navItems.map((navLink) => (
                <NavLink
                  key={navLink.name}
                  {...navLink}
                  onClick={() => toggleOpen()}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/10 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleOpen()}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavLinks;
