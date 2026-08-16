"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Clock, Hammer, ChevronLeft, ChevronRight } from "lucide-react";

interface ArtisanJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const journeyStages = [
  {
    step: "01",
    title: "The Bespoke Last",
    time: "4 Hours",
    description: "Carving and sanding the anatomical wooden mold from hornbeam timber, capturing every unique contour of the client's foot architecture.",
    image: "https://images.openai.com/static-rsc-4/iK8tdeQqgkkGkpMKZHNklbsXM7yDp02QqPcrHHX4YY3q8DWUnHRRDenpIFjv7DDWGpq8wJtsthGtbXNm8Hh1tNmFOMoPLogL1u6HmJR1RuN9X7-LEOHKJJpc7ld4uc7xBPIfEIAJbk51yx3CBQBw37iGCC339U5UTl8qhkLIYE04jPSM75yZNXpMfv29lq8G?purpose=fullsize",
  },
  {
    step: "02",
    title: "Leather Selection & Precision Cutting",
    time: "6 Hours",
    description: "Inspecting full-grain Tuscan calfskin under natural light. Master clickers cut away even microscopic imperfections by hand using specialized blades.",
    image: "https://images.openai.com/static-rsc-4/cjvX_ZPtcsZitJlIo3Pz_5vRVtpX118yxmUmgFBA4mMrUPwMxfaCN1m46vB9BaDebd1dVzpfFeKLc4lMffH28DBbTqra0bnD3WARGRRyPyK44CCsthovV9XJJLewIzfDjmmlUv5ppm0UJ94OQ8igA1OmtPdwwbCw7vvm1vTa8POjSye2DCBOeytJj57WLEZS?purpose=fullsize",
  },
  {
    step: "03",
    title: "Intricate Closing",
    time: "12 Hours",
    description: "The delicate art of stitching upper components together, executing precise brogueing patterns and reinforced structural seams.",
    image: "https://images.openai.com/static-rsc-4/h6FNywk3mnu9LCYOmC4hDob02MFPnSrm8pL-a5VczENus4CrCri61Z9zhI-w4JmX0J8EdX8KTjX3VnPTBMwnVjMdgR-DVLfd18BJQZs4Gh9xMhQCRSUB6I_wZTodc6PHMRbAnZvKX570flCJqEONyJNb29Avl1lNMrvCpIs90c8-CRl0z7-7XA57d2v6-tk_?purpose=fullsize",
  },
  {
    step: "04",
    title: "Hand Lasting",
    time: "8 Hours",
    description: "Pulling the leather tightly over the wooden last using traditional pincers by hand, allowing the hide to rest and form its permanent memory.",
    image: "https://images.openai.com/static-rsc-4/IjVBKBoCizj_QLALX_z9LYDL0UzpFwejlWW_mCH7CErpMXeGtwFCLvKAo5pLu9iAXb8vmUVYRSnfKkaepkyGt9IFXVtrYJTuH3YnRrbBmPQEKju4rtbmn352XrKrgHUEPAMVKDABo98Wgeb1Nah3LtiohUBE5f03yVrU68F7Fe4f0063KWL6DC96wbzCxe5M?purpose=fullsize",
  },
  {
    step: "05",
    title: "Goodyear Welting",
    time: "10 Hours",
    description: "Stitching a sturdy strip of leather (the welt) directly to the upper and inner sole edge with a waxed bristle cord.",
    image: "https://images.openai.com/static-rsc-4/L2G6wyo0NXizQglysyfhJZsdQSYIuHxRNTcQiLNLL45A-3XodWjdsUk3ez2o6nv3OC80hj7DZrzY_VFfrmfthVSHNxJkcxQX7DQSTUrYkUarms64LjrlZu2KXVhkixz8-StkJFtCIikFyr1i2Ne8kXciJTP0HptsgpUa7gXr8cniuzCMeU88O5ZbKIWEqcfV?purpose=fullsize",
  },
  {
    step: "06",
    title: "Sole Channeling & Stitching",
    time: "8 Hours",
    description: "Carving a microscopic flap into the oak-bark tanned leather sole, hand-stitching the heavy thread inside, and sealing the channel closed.",
    image: "https://images.openai.com/static-rsc-4/zQZ-ilnRjMMWSdCEdOyezyieimkz-FNQlPqR6dJrHSMd-tBTh_SUYstMGQhfo9K88WeAJ-82Ie-j0h5NGfKOhMW8VxP2vK7ffwtw2Q6BjU_DY9ndqoc9vWSohlOSb-F5LKHxW-XHkyK7ihoSd180rwve9ZSru6Aru6euCQdCXiwhZiidZpfXZ8JUtlP57te1?purpose=fullsize",
  },
  {
    step: "07",
    title: "Heel Building",
    time: "5 Hours",
    description: "Stacking individual leather lifts one by one onto the heel base, hammering them securely, and trimming the edges flush.",
    image: "https://images.openai.com/static-rsc-4/TcHbALYtnG_T2pR75ZaHz8nfXjwsHfrbKuTAM6COfwsdZb8tcdM2EYQQdU19eubm5OeExlHygCzYOuwmVYZ_OqFGMufqJdyKF82Nq9eR9Ve-_BosEpcVp7xxnI-hoAhMF5vNL1yE122S4yx9OeXlWan9Imt4YfCRxoACPpLfD9gWLY0JIxwEZwrbn2HSr2tC?purpose=fullsize",
  },
  {
    step: "08",
    title: "Patina & Mirror Polish",
    time: "7 Hours",
    description: "Applying multi-layered artisanal dyes by hand with cotton cloths, followed by hours of traditional wax-glazing to achieve a deep glass finish.",
    image: "https://images.openai.com/static-rsc-4/66q6BOyhgAO5EBGAPzbK784xoxfuNltp7_xcLApWR7NlVAeCvFn-pIeqmdDPAvWcVJEhMfx2EJYPf3D0qbsXisw7o7HSMYIHLlShOO5dIq4ts0FbZXUMn_pn7xZEfYdVQmVYmLbi_ARrolwjnoKSOAzw2n-SCF0SHGV83NLzdZmspOKlDOeApMKV9Bfe7wIk?purpose=fullsize",
  },
];

export default function ArtisanJourneyModal({ isOpen, onClose }: ArtisanJourneyModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setCurrentIndex(0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const currentStage = journeyStages[currentIndex];

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < journeyStages.length - 1 ? prev + 1 : prev));
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-4xl bg-[#171513] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-[11px] uppercase tracking-wider font-mono">
                  <Sparkles className="w-3 h-3" /> Stage {currentStage.step} of 08
                </span>
                <span className="text-xs text-neutral-400 font-serif hidden sm:inline">
                  Artisan Journey
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Single Slide Display */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center"
                >
                  {/* Image */}
                  <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-xl overflow-hidden border border-white/10 bg-black/50">
                    <img
                      src={currentStage.image}
                      alt={currentStage.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-mono text-accent-gold flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {currentStage.time}
                    </div>
                  </div>

                  {/* Stage Text */}
                  <div className="flex flex-col justify-center space-y-3">
                    <span className="text-4xl md:text-5xl font-serif text-accent-gold/25 font-light">
                      {currentStage.step}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-accent-cream leading-tight">
                      {currentStage.title}
                    </h3>
                    <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                      {currentStage.description}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-accent-gold">
                      <Hammer className="w-3.5 h-3.5" /> Hand-Executed Process
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/30">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              {/* Step Indicators */}
              <div className="flex items-center gap-1.5">
                {journeyStages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? "bg-accent-gold w-5"
                        : "bg-white/20 w-1.5 hover:bg-white/40"
                    }`}
                    aria-label={`Jump to stage ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === journeyStages.length - 1}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-accent-gold/15 border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}