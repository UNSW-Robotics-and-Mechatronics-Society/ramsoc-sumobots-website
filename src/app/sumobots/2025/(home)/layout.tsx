import { Footer } from "../_components/Footer";
import { Navbar } from "../_components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
        {children}
      <Footer/>
    </>
  );
}