"use client";

import { useState } from "react";
import { Sparkles, ArrowUpRight, ShieldCheck, Award, HeartHandshake, Check } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

const showroomLinks = [
  { name: "The Milano Cap-Toe", href: "#showroom" },
  { name: "The Venezia Double Monk", href: "#showroom" },
  { name: "The Firenze Wholecut", href: "#showroom" },
  { name: "The Roma Penny Loafer", href: "#showroom" },
];

const navigationLinks = [
  { name: "Artisanal Journey", href: "#craftsmanship" },
  { name: "Quality Laboratory", href: "#quality" },
  { name: "Sartorial Concierge", href: "#concierge" },
  { name: "Bespoke Allocations", href: "#showroom" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0d0b0a] border-t border-white/10 text-neutral-400 font-light overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-accent-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-12">
        {/* Top Atelier Credentials */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 border-b border-white/10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-serif font-normal">Authentic Goodyear Welt</h4>
                <p className="text-xs text-neutral-500">Traditional hand-welted sole construction.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-serif font-normal">Tuscan Leather Certification</h4>
                <p className="text-xs text-neutral-500">100% full-grain vegetable-tanned hides.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-serif font-normal">Lifetime Atelier Resoling</h4>
                <p className="text-xs text-neutral-500">Permanent restoration privileges included.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xl font-serif text-white tracking-wider">
                LEATHERCRAFT
              </span>
            </div>

            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              Handcrafting bespoke footwear in Florence since 1928. Every pair represents over 60 hours of artisanal handwork, anatomical lasts, and uncompromised Italian tradition.
            </p>

            <div className="text-xs space-y-1 font-mono text-neutral-500">
              <p>Via de&apos; Tornabuoni 14, 50123 Firenze, Italy</p>
              <p>Mon – Sat: 09:00 – 19:00 CET</p>
              <p className="text-accent-gold">concierge@leathercraft.it</p>
            </div>
          </div>

          {/* Showroom Links */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-widest font-mono text-accent-gold">
              Collection
            </h5>
            <ul className="space-y-3 text-sm">
              {showroomLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent-gold" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-widest font-mono text-accent-gold">
              The Atelier
            </h5>
            <ul className="space-y-3 text-sm">
              {navigationLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent-gold" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Gazette Newsletter */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-widest font-mono text-accent-gold">
              Private Gazette
            </h5>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Receive private notices regarding limited hide batches and seasonal last releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-accent-gold/60 transition-colors"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="w-full py-2.5 rounded-xl bg-accent-gold/15 border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-black transition-all text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Enrolled in Gazette
                  </>
                ) : (
                  "Request Invitation"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <p>© {new Date().getFullYear()} LeatherCraft Atelier Firenze. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-accent-gold transition-colors flex items-center gap-1 cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}