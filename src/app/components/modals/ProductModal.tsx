"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Ruler, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useShoeStore } from "../../../store/useShoeStore";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const sizes = ["39", "40", "41", "42", "43", "44", "45", "46"];

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const addToCart = useShoeStore((state) => state.addToCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const handleAcquire = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }
    
    setError(false);
    setIsAcquiring(true);

    setTimeout(() => {
      if (product) {
        addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          size: selectedSize,
          image: product.image,
        });
      }
      setIsAcquiring(false);
      setIsSuccess(true);
    }, 1500); 
  };

  const handleClose = () => {
    setTimeout(() => {
      setSelectedSize(null);
      setIsSuccess(false);
      setError(false);
    }, 300);
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Added overscroll-none so it never triggers background scrolling
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md overflow-y-auto overscroll-none"
          onClick={handleClose}
        >
          {/* Removed items-center and justify-center to fix the flexbox scrolling bug */}
          <div className="flex min-h-full p-4 py-10 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              // Added m-auto to perfectly center it AND allow scrolling if it's too tall
              className="m-auto relative w-full max-w-5xl bg-charcoal border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-sm rounded-full text-neutral-400 hover:text-accent-cream transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Reduced minimum height so it fits on laptop screens without scrolling */}
              <div className="w-full md:w-1/2 h-[280px] md:h-auto md:min-h-[500px] relative bg-background">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${isSuccess ? 'opacity-50 grayscale' : 'opacity-100'}`}
                />
              </div>

              {/* Reduced padding from p-12 to p-8 to compress vertical space */}
              <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col items-center text-center space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-accent-gold/10 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-10 h-10 text-accent-gold" />
                      </div>
                      <h3 className="text-3xl font-serif text-accent-cream">Acquisition Successful</h3>
                      <p className="text-neutral-400 font-light max-w-sm">
                        {product.name} (Size {selectedSize}) has been securely added to your Atelier Bag.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-6 px-8 py-4 rounded-full border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-background transition-all text-xs uppercase tracking-widest"
                      >
                        Continue Exploring
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="checkout"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col justify-between h-full space-y-5"
                    >
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-gold">
                            {product.category}
                          </span>
                          <h2 className="text-3xl lg:text-4xl font-serif text-accent-cream mt-1">
                            {product.name}
                          </h2>
                          <p className="text-xl font-light text-neutral-300 mt-1">
                            {product.price}
                          </p>
                        </div>

                        <p className="text-sm text-neutral-400 leading-relaxed font-light">
                          {product.description} Handcrafted in Italy using time-honored techniques.
                        </p>

                        <div className="space-y-3 pt-3 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs uppercase tracking-widest ${error ? 'text-red-400' : 'text-neutral-300'}`}>
                              {error ? "Please Select a Size *" : "Select Size (EU)"}
                            </span>
                            <button className="text-xs text-accent-gold hover:text-accent-cream flex items-center gap-1 transition-colors">
                              <Ruler className="w-3.5 h-3.5" /> Size Guide
                            </button>
                          </div>
                          <div className="grid grid-cols-4 gap-2.5">
                            {sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => {
                                  setSelectedSize(size);
                                  setError(false);
                                }}
                                className={`py-2.5 rounded-lg border text-sm font-mono transition-all duration-300 ${
                                  selectedSize === size
                                    ? "bg-accent-gold border-accent-gold text-background shadow-lg shadow-accent-gold/20"
                                    : "border-white/10 text-neutral-400 hover:border-accent-gold/50 hover:text-accent-cream"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleAcquire}
                        disabled={isAcquiring}
                        className="w-full py-4 rounded-full bg-accent-cream text-background font-medium hover:bg-accent-gold transition-colors flex items-center justify-center gap-3 text-xs uppercase tracking-widest shadow-xl disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                      >
                        {isAcquiring ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Securing Allocation...
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" /> Acquire Pair
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}