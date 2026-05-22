import { create } from "zustand";
import { persist } from "zustand/middleware";
import { services, type Service } from "./yallo-data";

export type CartItem = { serviceId: string; qty: number };

type CartState = {
  items: CartItem[];
  add: (serviceId: string) => void;
  remove: (serviceId: string) => void;
  setQty: (serviceId: string, qty: number) => void;
  clear: () => void;
  bookingRef: string | null;
  setBookingRef: (r: string | null) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      bookingRef: null,
      add: (serviceId) =>
        set((s) => {
          const existing = s.items.find((i) => i.serviceId === serviceId);
          if (existing) {
            return { items: s.items.map((i) => (i.serviceId === serviceId ? { ...i, qty: i.qty + 1 } : i)) };
          }
          return { items: [...s.items, { serviceId, qty: 1 }] };
        }),
      remove: (serviceId) =>
        set((s) => ({ items: s.items.filter((i) => i.serviceId !== serviceId) })),
      setQty: (serviceId, qty) =>
        set((s) => ({
          items: qty <= 0
            ? s.items.filter((i) => i.serviceId !== serviceId)
            : s.items.map((i) => (i.serviceId === serviceId ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      setBookingRef: (r) => set({ bookingRef: r }),
    }),
    { name: "yallo-cart" },
  ),
);

export function cartLines(items: CartItem[]) {
  return items
    .map((i) => {
      const svc = services.find((s) => s.id === i.serviceId);
      return svc ? { service: svc as Service, qty: i.qty, lineTotal: svc.price * i.qty } : null;
    })
    .filter((x): x is { service: Service; qty: number; lineTotal: number } => !!x);
}

export function cartTotals(items: CartItem[]) {
  const lines = cartLines(items);
  const subtotal = lines.reduce((a, l) => a + l.lineTotal, 0);
  const tax = Math.round(subtotal * 0.05);
  const platformFee = lines.length ? 29 : 0;
  const total = subtotal + tax + platformFee;
  const count = lines.reduce((a, l) => a + l.qty, 0);
  return { lines, subtotal, tax, platformFee, total, count };
}

export function makeBookingRef() {
  const r = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `YALLO#${r}`;
}
