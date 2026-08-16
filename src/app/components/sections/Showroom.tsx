"use client";
import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Grid, Loader2 } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import ProductModal from "../modals/ProductModal";

// Define the shape of our data
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

export default function Showroom() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Fetch data from our new backend API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Determine how many products to show
  const displayedProducts = showAll ? products : products.slice(0, 3);

  return (
    <section className="relative w-full min-h-screen bg-background py-28 px-6 md:px-16 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full space-y-16">
        
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Curated Collections
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-accent-cream leading-tight">
                The Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-accent-copper to-accent-bronze">
                  Showroom Showcase.
                </span>
              </h2>
            </div>
            <p className="text-neutral-400 max-w-md text-sm md:text-base font-light">
              Explore our masterworks of sartorial elegance. Each silhouette is produced in strictly limited monthly allocations.
            </p>
          </div>
        </ScrollReveal>

        {/* Loading State */}
        {isLoading ? (
          <div className="w-full flex flex-col items-center justify-center py-24 text-accent-gold space-y-4">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs uppercase tracking-widest">Accessing Atelier Database...</span>
          </div>
        ) : (
          <>
            {/* Dynamic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedProducts.map((product) => (
                <ScrollReveal key={product.id}>
                  <div className="group bg-charcoal/40 rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between hover:border-accent-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-gold/5 h-full">
                    
                    <div className="relative h-72 w-full overflow-hidden bg-background">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-accent-gold shadow-lg">
                        {product.price}
                      </div>
                    </div>

                    <div className="p-8 space-y-6 flex flex-col justify-between flex-grow">
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent-gold">
                          {product.category}
                        </span>
                        <h3 className="text-2xl font-serif text-accent-cream">{product.name}</h3>
                        <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-accent-gold" /> Handcrafted
                        </span>
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-accent-gold hover:text-accent-cream transition-colors group-hover:translate-x-1 duration-300"
                        >
                          Acquire Pair <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Explore All Button */}
            {!showAll && products.length > 3 && (
              <ScrollReveal>
                <div className="w-full flex justify-center pt-8">
                  <button 
                    onClick={() => setShowAll(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-background transition-all text-xs uppercase tracking-widest shadow-lg"
                  >
                    <Grid className="w-4 h-4" /> Explore Full Collection
                  </button>
                </div>
              </ScrollReveal>
            )}
          </>
        )}

      </div>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}