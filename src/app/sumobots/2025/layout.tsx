import type { Metadata } from "next";
import "./styles.css";
import { Navbar } from "./_components/Navbar/Navbar";
import { Footer } from "./_components/Footer/Footer";

export const metadata: Metadata = {
  title: "MTRNSoc Sumobots 2025",
  description: "Official UNSW MTRNSoc Sumobots 2024 website.",
  icons: { icon: "/icon.svg" },
  twitter: {
    card: "summary_large_image",
    title: "MTRNSoc Sumobots 2025",
    site: "@site",
    creator: "@creator",
    images: "https://unsw-mechatronics-society.github.io/sumobots/og.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://unsw-mechatronics-society.github.io/sumobots/",
    title: "MTRNSoc Sumobots 2025",
    description: "Official UNSW MTRNSoc Sumobots 2024 website.",
    siteName: "MTRNSoc Sumobots 2025",
    images: "https://unsw-mechatronics-society.github.io/sumobots/og.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="font-main w-full bg-black text-2xl text-white">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </main>
  );
}
