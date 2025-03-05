import { Metadata } from "next";
import { Footer } from "./_components/Footer";
import "@/app/styles.css";

export const metadata: Metadata = {
  title: "RAMSoc Sumobots 2025",
  description:
    "Sumobots 2025 is here! Design, build, and compete in the most exciting robotics competition of the year. Sign up now!",
  icons: { icon: "/2025/logo.svg" },
  twitter: {
    card: "summary_large_image",
    title: "RAMSoc Sumobots 2025",
    site: "@site",
    creator: "@creator",
    images: "/2025/og.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://projects.ramsocunsw.org/2025/",
    title: "RAMSoc Sumobots 2025",
    description:
      "Sumobots 2025 is here! Design, build, and compete in the most exciting robotics competition of the year. Sign up now!",
    siteName: "RAMSoc Sumobots 2025",
    images: "/2025/og.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar overflow-y-scroll antialiased">
      <body className="font-main w-full bg-black text-2xl text-white">
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
