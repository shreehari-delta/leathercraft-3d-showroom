"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useShoeStore } from "@/store/useShoeStore";

export default function AtelierBag() {
  const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity } = useShoeStore();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const bespokeCommission = subtotal > 0 ? 0 : 0; // Complimentary atelier shipping
  const total = subtotal + bespokeCommission;

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-99999 flex justify-end">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleCart}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-[#141210] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white text-base font-serif">Acquisition Bag</h3>
                  <p className="text-[11px] font-mono text-neutral-400">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)} Reserved {cart.length === 1 ? "Pair" : "Pairs"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleCart}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-white/2 border border-white/10 flex items-center justify-center text-neutral-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-serif text-lg">Your Bag is Empty</p>
                    <p className="text-neutral-500 text-xs max-w-xs font-light">
                      Explore the showroom collection to reserve your handcrafted bespoke pair.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleCart}
                    className="px-5 py-2 rounded-full border border-accent-gold/40 text-accent-gold text-xs font-mono uppercase tracking-wider hover:bg-accent-gold hover:text-black transition-all"
                  >
                    View Showroom
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 rounded-2xl bg-white/2 border border-white/5 flex gap-4 items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <div className="w-16 h-16 rounded-xl bg-black/40 border border-white/10 overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <h4 className="text-white text-sm font-serif">{item.name}</h4>
                        <p className="text-xs text-neutral-400 font-mono">
                          Size: {item.selectedSize || "EU 42"}
                        </p>
                        <p className="text-accent-gold text-xs font-mono">
                          ${item.price.toLocaleString()} USD
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Remove pair"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>Atelier Handcrafting Subtotal</span>
                    <span className="text-white">${subtotal.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Worldwide Insured Courier</span>
                    <span className="text-accent-gold">Complimentary</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm text-white font-serif font-normal">
                    <span>Estimated Total</span>
                    <span className="text-accent-gold font-mono">${total.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-gold" />
                  <span>Numbered Certificate of Authenticity Included</span>
                </div>

                <button
                  type="button"
                  onClick={() => alert("Proceeding to secure atelier bespoke allocation checkout.")}
                  className="w-full py-3.5 rounded-xl bg-accent-gold text-black hover:bg-accent-cream transition-all font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg shadow-accent-gold/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" /> Request Bespoke Allocation <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}