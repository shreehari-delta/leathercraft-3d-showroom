"use client";

import { useState } from "react";
import { Sparkles, Compass } from "lucide-react";
import ArtisanJourneyModal from "../modals/ArtisanJourneyModal";

export default function Craftsmanship() {
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);

  return (
    <section className="relative w-full py-28 px-6 md:px-16 bg-background border-t border-white/5 flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Legacy of Excellence
        </div>

        <h2 className="text-4xl md:text-6xl font-serif text-accent-cream leading-tight">
          Uncompromised Italian <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-accent-copper to-accent-bronze">
            Artisanal Mastery.
          </span>
        </h2>

        <p className="text-neutral-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
          Every pair of shoes undergoes rigorous construction standards, passing through the hands of master artisans who utilize techniques passed down through generations.
        </p>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => setIsJourneyOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs uppercase tracking-widest hover:bg-accent-gold hover:text-background transition-all shadow-xl cursor-pointer"
          >
            <Compass className="w-4 h-4" /> Open 8-Stage Artisan Journey
          </button>
        </div>
      </div>

      {/* Renders the manual previous/next modal */}
      <ArtisanJourneyModal
        isOpen={isJourneyOpen}
        onClose={() => setIsJourneyOpen(false)}
      />
    </section>
  );
}