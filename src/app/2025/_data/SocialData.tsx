import {
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";

export const SocialData = {
  instagram: {
    href: "https://www.instagram.com/ramsocunsw",
    label: "RAMSOC UNSW Instagram",
    icon: (size: number) => <FaInstagram size={size} />,
  },
  facebook: {
    href: "https://www.facebook.com/RAMSOCUNSW",
    label: "RAMSOC UNSW Facebook",
    icon: (size: number) => <FaFacebook size={size} />,
  },
  discord: {
    href: "https://discord.com/invite/4dWMWAjWm9",
    label: "RAMSOC UNSW Discord Server",
    icon: (size: number) => <FaDiscord size={size} />,
  },
  email: {
    href: "mailto:contact@ramsocunsw.org",
    label: "contact@ramsocunsw.org",
    icon: (size: number) => <FaEnvelope size={size} />,
  },
};

export type SocialKeys = keyof typeof SocialData;
