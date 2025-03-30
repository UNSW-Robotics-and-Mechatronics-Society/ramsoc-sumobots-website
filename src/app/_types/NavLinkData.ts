type NavLinkData = {
  name: string;
  label: string;
  href?: string | "";
  color?: "default" | "white";
  dropdown?: NavLinkData[];
  isDisabled?: boolean;
};

export default NavLinkData;
