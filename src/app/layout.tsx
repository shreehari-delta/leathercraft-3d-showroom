import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/animations/SmoothScroll";

export const metadata: Metadata = {
  title: "LeatherCraft | Luxury Digital Showroom",
  description: "Crafted by Hands. Designed for Legends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background text-accent-cream">
      <body className="antialiased selection:bg-accent-gold selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}