import { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/app/styles.css";
import { SUMOBOTS_SITE_URL } from "@/app/constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(SUMOBOTS_SITE_URL),
  title: "RAMSoc Sumobots 2026",
  description:
    "Sumobots 2026 is here! Design, build, and compete in the most exciting robotics competition of the year.",
  icons: {
    icon: [{ url: "/ramsoc_logo.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: "RAMSoc Sumobots 2026",
    site: "@site",
    creator: "@creator",
    images: "/2025/og.png",
  },
  openGraph: {
    type: "website",
    url: "https://sumobots.ramsoc.org/2026",
    title: "RAMSoc Sumobots 2026",
    description:
      "Sumobots 2026 is here! Design, build, and compete in the most exciting robotics competition of the year.",
    siteName: "RAMSoc Sumobots 2026",
    images: "/2025/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
