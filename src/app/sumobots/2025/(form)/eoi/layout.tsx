import { Navbar } from "../_components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAMSoc Sumobots 2025 - EOI Form",
  description: "Join the battle! Register your interest now and get exclusive updates on the upcoming event. Don't miss out!",
  icons: { icon: "/sumobots/2025/logo.svg" },
  twitter: {
    card: "summary_large_image",
    title: "RAMSoc Sumobots 2025",
    site: "@site",
    creator: "@creator",
    images: "/sumobots/2025/og.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://projects.ramsocunsw.org/sumobots/2025/eoi",
    title: "RAMSoc Sumobots 2025",
    description: "Join the battle! Register your interest now and get exclusive updates on the upcoming event. Don't miss out!",
    siteName: "RAMSoc Sumobots 2025 - EOI Form",
    images: "/sumobots/2025/og.jpg",
  },
};

export default function EOILayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}