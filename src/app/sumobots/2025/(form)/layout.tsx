import Script from "next/script";
import "../styles.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased no-scrollbar overflow-y-scroll">
      <head>
        <Script
          strategy="beforeInteractive"
          src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </head>
      <body className="font-main w-full bg-black text-2xl text-white">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
