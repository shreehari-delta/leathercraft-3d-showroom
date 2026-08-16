import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  selectedSize?: string;
  image?: string;
  quantity: number;
}

export interface ShoeStore {
  // 3D Canvas / Selection state
  selectedShoe: string;
  setSelectedShoe: (shoe: string) => void;
  leatherType: string;
  setLeatherType: (type: string) => void;
  soleType: string;
  setSoleType: (sole: string) => void;

  // Cart / Bag state
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

export const useShoeStore = create<ShoeStore>((set) => ({
  // Default shoe settings
  selectedShoe: "oxford",
  setSelectedShoe: (shoe) => set({ selectedShoe: shoe }),
  leatherType: "tuscan-calf",
  setLeatherType: (type) => set({ leatherType: type }),
  soleType: "goodyear-leather",
  setSoleType: (sole) => set({ soleType: sole }),

  // Cart Drawer actions
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  cart: [
    {
      id: "oxford-milano",
      name: "The Milano Cap-Toe Oxford",
      price: 890,
      selectedSize: "EU 42",
      image: "https://images.openai.com/static-rsc-4/iK8tdeQqgkkGkpMKZHNklbsXM7yDp02QqPcrHHX4YY3q8DWUnHRRDenpIFjv7DDWGpq8wJtsthGtbXNm8Hh1tNmFOMoPLogL1u6HmJR1RuN9X7-LEOHKJJpc7ld4uc7xBPIfEIAJbk51yx3CBQBw37iGCC339U5UTl8qhkLIYE04jPSM75yZNXpMfv29lq8G?purpose=fullsize",
      quantity: 1
    }
  ],

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id && i.selectedSize === item.selectedSize);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id && i.selectedSize === item.selectedSize
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          isCartOpen: true,
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
        isCartOpen: true,
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, delta) =>
    set((state) => ({
      cart: state.cart
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[],
    })),

  clearCart: () => set({ cart: [] }),
}));