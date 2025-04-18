import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import { createIslamicPatternSVG } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundImage: createIslamicPatternSVG(),
        backgroundAttachment: "fixed"
      }}
    >
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
