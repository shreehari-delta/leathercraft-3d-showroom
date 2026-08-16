"use client";
import { useState } from "react";
import { ShieldCheck, Droplets, Flame, Activity, Zap, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal"; // Imported your scroll animation

const tests = [
  {
    id: "water",
    name: "Hydrophobic Water Resistance",
    icon: Droplets,
    metric: "100% Repellent",
    description: "Treated with organic hydrophobic oils to repel moisture and liquids instantly without altering grain breathability.",
  },
  {
    id: "flex",
    name: "100,000+ Step Flex Test",
    icon: Activity,
    metric: "Zero Crease Cracking",
    description: "Simulated pneumatic stress testing ensures the full-grain leather flexes harmoniously with natural foot mechanics.",
  },
  {
    id: "thermal",
    name: "Thermal & Heat Resistance",
    icon: Flame,
    metric: "Up to 120°C Stable",
    description: "Evaluated under high-temperature friction to ensure adhesives and welt stitching maintain absolute structural integrity.",
  },
  {
    id: "scratch",
    name: "Micro-Abrasion Shielding",
    icon: Zap,
    metric: "Grade-A Hardness",
    description: "Protected by a natural wax finish that self-heals minor surface friction under light palm warmth.",
  },
];

export default function QualityLab() {
  const [activeTest, setActiveTest] = useState(tests[0]);

  return (
    <section className="relative w-full min-h-screen bg-background py-24 px-6 md:px-16 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-xs uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                Laboratory Certification
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-accent-cream leading-tight">
                Rigorous Quality <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-gold via-accent-copper to-accent-bronze">
                  Testing Standards.
                </span>
              </h2>
            </div>
            <p className="text-neutral-400 max-w-md text-sm md:text-base font-light">
              Before a pair of shoes bears the LeatherCraft insignia, they are subjected to extreme simulated environmental trials to guarantee lifelong resilience.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Lab Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Test Selector List */}
          <div className="lg:col-span-1 space-y-3">
            {tests.map((test, index) => {
              const Icon = test.icon;
              const isSelected = activeTest.id === test.id;
              return (
                <ScrollReveal key={test.id}>
                  <button
                    onClick={() => setActiveTest(test)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? "bg-leather-dark border-accent-gold/50 shadow-lg shadow-accent-gold/5"
                        : "bg-charcoal/40 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${isSelected ? "bg-accent-gold/10 border-accent-gold/30 text-accent-gold" : "bg-white/5 border-white/10 text-neutral-400"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-sm font-serif transition-colors duration-300 ${isSelected ? "text-accent-cream font-medium" : "text-neutral-400"}`}>
                        {test.name}
                      </span>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Column: Live Test Output Display */}
          <ScrollReveal className="lg:col-span-2 h-full">
            <div className="bg-charcoal/80 p-8 md:p-12 rounded-3xl border border-white/10 relative flex flex-col justify-between shadow-2xl backdrop-blur-md overflow-hidden space-y-8 h-full min-h-87.5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-accent-gold">Simulation Active</span>
                  
                  {/* Animated Metric Badge */}
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={activeTest.metric}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-mono"
                    >
                      {activeTest.metric}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Animated Text Content */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeTest.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-3"
                  >
                    <h3 className="text-2xl md:text-3xl font-serif text-accent-cream">{activeTest.name}</h3>
                    <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                      {activeTest.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 relative z-10">
                <span className="flex items-center gap-1.5 text-accent-gold">
                  <CheckCircle className="w-4 h-4" /> ISO-9001 Luxury Certified
                </span>
                <span>Trial Cycle: 100% Passed</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}