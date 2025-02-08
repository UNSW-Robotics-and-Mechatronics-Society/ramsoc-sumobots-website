import Script from "next/script";
import "../styles.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <main className="font-main w-full bg-black text-2xl text-white">
          <Script
            strategy="beforeInteractive"
            src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          />
          {/* <ReCaptcha/> */}
          {children}
        </main>
      </body>
    </html>
  );
}
