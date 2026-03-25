import { create } from "zustand";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  size: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  category: string;
  inStock: boolean;
  stockCount: number;
};

type CartItem = Product & { quantity: number; note?: string };

type CartStore = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  updateNote: (note: string) => void;
  orderNote: string;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  orderNote: "",
  addItem: (product) =>
    set((s) => {
      const exists = s.items.find((i) => i.id === product.id);
      if (exists) {
        return { items: s.items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
      }
      return { items: [...s.items, { ...product, quantity: 1 }] };
    }),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  updateQty: (id, qty) =>
    set((s) => ({
      items: qty <= 0
        ? s.items.filter((i) => i.id !== id)
        : s.items.map((i) => i.id === id ? { ...i, quantity: qty } : i),
    })),
  updateNote: (note) => set({ orderNote: note }),
  clearCart: () => set({ items: [], orderNote: "" }),
}));