import { create } from "zustand";
import { persist } from "zustand/middleware";
import { services, type Service } from "./yallo-data";

export type CartItem = { serviceId: string; qty: number; slot?: { date: string; time: string } };
export type BookingMode = "instant" | "scheduled" | "recurring";

type CartState = {
  cityId: string | null;
  setCity: (id: string) => void;
  phone: string | null;
  setPhone: (p: string | null) => void;
  authed: boolean;
  setAuthed: (b: boolean) => void;
  address: string | null;
  setAddress: (a: string | null) => void;
  mode: BookingMode;
  setMode: (m: BookingMode) => void;
  promo: string | null;
  setPromo: (p: string | null) => void;
  items: CartItem[];
  add: (serviceId: string) => void;
  remove: (serviceId: string) => void;
  setQty: (serviceId: string, qty: number) => void;
  setItemSlot: (serviceId: string, slot: { date: string; time: string }) => void;
  clear: () => void;
  bookingRef: string | null;
  setBookingRef: (r: string | null) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cityId: null,
      setCity: (id) => set({ cityId: id }),
      phone: null,
      setPhone: (p) => set({ phone: p }),
      authed: false,
      setAuthed: (b) => set({ authed: b }),
      address: null,
      setAddress: (a) => set({ address: a }),
      mode: "scheduled",
      setMode: (m) => set({ mode: m }),
      promo: null,
      setPromo: (p) => set({ promo: p }),
      items: [],
      bookingRef: null,
      add: (serviceId) =>
        set((s) => {
          const existing = s.items.find((i) => i.serviceId === serviceId);
          if (existing) return { items: s.items.map((i) => (i.serviceId === serviceId ? { ...i, qty: i.qty + 1 } : i)) };
          return { items: [...s.items, { serviceId, qty: 1 }] };
        }),
      remove: (serviceId) => set((s) => ({ items: s.items.filter((i) => i.serviceId !== serviceId) })),
      setQty: (serviceId, qty) =>
        set((s) => ({
          items: qty <= 0
            ? s.items.filter((i) => i.serviceId !== serviceId)
            : s.items.map((i) => (i.serviceId === serviceId ? { ...i, qty } : i)),
        })),
      setItemSlot: (serviceId, slot) =>
        set((s) => ({ items: s.items.map((i) => (i.serviceId === serviceId ? { ...i, slot } : i)) })),
      clear: () => set({ items: [], promo: null }),
      setBookingRef: (r) => set({ bookingRef: r }),
    }),
    { name: "yallo-cart" },
  ),
);

export function cartLines(items: CartItem[]) {
  return items
    .map((i) => {
      const sv = services.find((s) => s.id === i.serviceId);
      return sv ? { service: sv as Service, qty: i.qty, slot: i.slot, lineTotal: sv.price * i.qty } : null;
    })
    .filter((x): x is { service: Service; qty: number; slot?: { date: string; time: string }; lineTotal: number } => !!x);
}

export function cartTotals(items: CartItem[], promo?: string | null) {
  const lines = cartLines(items);
  const subtotal = lines.reduce((a, l) => a + l.lineTotal, 0);
  const discount = promo === "WELCOME100" ? Math.min(100, subtotal) : 0;
  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * 0.18);
  const platformFee = lines.length ? Math.round(taxable * 0.02) : 0;
  const total = taxable + tax + platformFee;
  const count = lines.reduce((a, l) => a + l.qty, 0);
  return { lines, subtotal, discount, tax, platformFee, total, count };
}

export function makeBookingRef() {
  const r = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `YALLO#${r}`;
}
