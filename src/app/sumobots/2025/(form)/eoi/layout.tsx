import { Navbar } from "../_components/Navbar";

export default function EOILayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}