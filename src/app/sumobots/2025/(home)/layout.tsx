import { Metadata } from "next";
import { Footer } from "../_components/Footer";
import { Navbar } from "../_components/Navbar";
import "../styles.css"

export const metadata: Metadata = {
  title: "RAMSoc Sumobots 2025 - EOI Form",
  description: "Sumobots 2025 is here! Design, build, and compete in the most exciting robotics competition of the year. Sign up now!",
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
    description: "Sumobots 2025 is here! Design, build, and compete in the most exciting robotics competition of the year. Sign up now!",
    siteName: "RAMSoc Sumobots 2025 - EOI Form",
    images: "/sumobots/2025/og.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-main w-full bg-black text-2xl text-white">
        <main>
          <Navbar/>
            {children}
          <Footer/>
        </main>
      </body>
    </html>
  );
}