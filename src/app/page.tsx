"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Sparkles, ArrowDown, ShoppingBag } from "lucide-react";
import { useShoeStore } from "@/store/useShoeStore";

const ShoeCanvas = dynamic(() => import("./components/3d/ShoeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-110 md:h-130 flex items-center justify-center">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-accent-gold animate-pulse">
        <Sparkles className="w-4 h-4" /> Initializing 3D Model...
      </div>
    </div>
  ),
});

// Sections
import Showroom from "./components/sections/Showroom";
import Craftsmanship from "./components/sections/Craftsmanship";
import QualityLab from "./components/sections/QualityLab";
import AiAssistant from "./components/sections/AiAssistant";
import Footer from "./components/sections/Footer";
import AtelierBag from "./components/ui/AtelierBag";

export default function Home() {
  const { toggleCart, cart } = useShoeStore();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Force scroll to top on page refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Persistent Atelier Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-background/70 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-lg md:text-xl font-serif text-white tracking-widest uppercase">
            LeatherCraft
          </span>
        </div>

        <button
          type="button"
          onClick={toggleCart}
          className="relative flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/3 hover:border-accent-gold/40 text-neutral-200 hover:text-white transition-all cursor-pointer"
          aria-label="Open Acquisition Bag"
        >
          <ShoppingBag className="w-4 h-4 text-accent-gold" />
          <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">Bag</span>
          {totalCartItems > 0 && (
            <span className="w-5 h-5 rounded-full bg-accent-gold text-black text-[10px] font-bold flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-162.5 h-85 bg-accent-gold/10 blur-[150px] pointer-events-none" />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-xs uppercase tracking-widest font-mono mb-2 z-10">
          <Sparkles className="w-3.5 h-3.5" />
          Firenze • Bespoke Shoemakers Since 1928
        </div>

        {/* 3D Model Stage */}
        <div className="w-full max-w-4xl h-105 sm:h-120 md:h-130 z-10 cursor-grab active:cursor-grabbing">
          <ShoeCanvas />
        </div>

        {/* Main Headline */}
        <div className="text-center space-y-4 max-w-4xl z-10 -mt-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-accent-cream leading-tight">
            Sculpted by Hand. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-gold via-accent-copper to-accent-bronze">
              Engineered for Decades.
            </span>
          </h1>

          <p className="text-neutral-400 text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed">
            Experience uncompromised Tuscan leatherwork, custom hornbeam lasts, and authentic 360° Goodyear welt construction.
          </p>
        </div>

        {/* Scroll Action */}
        <div className="mt-8 z-10">
          <a
            href="#craftsmanship"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent-gold hover:text-accent-cream transition-colors"
          >
            Explore Craftsmanship <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </section>

      <section id="craftsmanship"><Craftsmanship /></section>
      <section id="showroom"><Showroom /></section>
      <section id="quality"><QualityLab /></section>
      <section id="concierge"><AiAssistant /></section>
      <Footer />
      <AtelierBag />
    </main>
  );
}