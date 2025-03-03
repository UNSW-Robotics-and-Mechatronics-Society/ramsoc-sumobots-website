import type { Metadata } from "next";
import "./styles.css";
import { Navbar } from "./_components/Navbar/Navbar";
import { Footer } from "./_components/Footer/Footer";

export const metadata: Metadata = {
  title: "MTRNSoc Sumobots 2024",
  description: "Official UNSW MTRNSoc Sumobots 2024 website.",
  icons: { icon: "/icon.svg" },
  twitter: {
    card: "summary_large_image",
    title: "MTRNSoc Sumobots 2024",
    site: "@site",
    creator: "@creator",
    images: "https://unsw-mechatronics-society.github.io/og.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://unsw-mechatronics-society.github.io/",
    title: "MTRNSoc Sumobots 2024",
    description: "Official UNSW MTRNSoc Sumobots 2024 website.",
    siteName: "MTRNSoc Sumobots 2024",
    images: "https://unsw-mechatronics-society.github.io/og.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <main className="font-main w-full bg-black text-2xl text-white">
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </main>
      </body>
    </html>
  );
}
