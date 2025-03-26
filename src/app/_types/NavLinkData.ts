type NavLinkData = {
  name: string;
  label: string;
  href?: string | "";
  color?: "default" | "white";
  size?: "default" | "lg" | "sm";
  dropdown?: NavLinkData[];
};

export default NavLinkData;
