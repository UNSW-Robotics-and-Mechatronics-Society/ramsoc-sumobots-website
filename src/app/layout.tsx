import { Metadata } from "next";
import "@/app/styles.css";
import { SUMOBOTS_SITE_URL } from "@/app/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SUMOBOTS_SITE_URL),
  title: "RAMSoc Sumobots 2025",
  description:
    "Sumobots 2025 is here! Design, build, and compete in the most exciting robotics competition of the year.",
  icons: {
    icon: [{ url: "/ramsoc_logo.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: "RAMSoc Sumobots 2025",
    site: "@site",
    creator: "@creator",
    images: "/2025/og.png",
  },
  openGraph: {
    type: "website",
    url: "https://sumobots.ramsoc.org/2025",
    title: "RAMSoc Sumobots 2025",
    description:
      "Sumobots 2025 is here! Design, build, and compete in the most exciting robotics competition of the year.",
    siteName: "RAMSoc Sumobots 2025",
    images: "/2025/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
