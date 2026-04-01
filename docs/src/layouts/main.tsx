import { useState, useEffect } from "react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar scrolled={scrolled} />
      {children}
      <Footer />
    </div>
  );
}
