"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    // Keying off pathname ensures the transition resets and plays every single time
    <div key={pathname} className="relative overflow-hidden bg-background">
      {/* Content Fade & Unblur - Replays on every view/route trigger */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {/* Upward Sweeping Cinematic Shutter */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 pointer-events-none bg-charcoal border-b-2 border-accent-gold flex items-center justify-center shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-accent-gold font-serif tracking-[0.4em] text-lg uppercase"
        >
          Maison D'Art
        </motion.div>
      </motion.div>
    </div>
  );
}