// Mock catalog mirroring the mobile-customer domain shape.
export type Service = {
  id: string;          // e.g. "613B2AA2"
  sku: string;         // SVC#613B2AA2
  categoryId: string;
  name: string;
  desc: string;
  price: number;       // INR
  duration: number;    // minutes
  rating: number;
  reviews: number;
  featured?: boolean;
  popular?: boolean;
  image?: string;
  included: string[];
  notIncluded: string[];
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  eta: number;
  services: number;
};

export type City = {
  id: string;
  name: string;
  region: string;
  available: boolean;
  image: string;
};

export const cities: City[] = [
  { id: "hyd", name: "Hyderabad", region: "Telangana, India", available: true,
    image: "https://images.unsplash.com/photo-1572206912757-5a78ff4d79be?w=600&q=70" },
  { id: "blr", name: "Bengaluru", region: "Karnataka, India", available: true,
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=70" },
  { id: "pune", name: "Pune", region: "Maharashtra, India", available: true,
    image: "https://images.unsplash.com/photo-1567606404787-689308d3d6e3?w=600&q=70" },
  { id: "chn", name: "Chennai", region: "Tamil Nadu, India", available: false,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=60" },
  { id: "del", name: "Delhi NCR", region: "India", available: false,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=60" },
  { id: "dxb", name: "Dubai", region: "UAE", available: false,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=60" },
  { id: "hou", name: "Houston", region: "Texas, USA", available: false,
    image: "https://images.unsplash.com/photo-1612631355117-32ad58c8c80f?w=400&q=60" },
  { id: "lax", name: "Los Angeles", region: "California, USA", available: false,
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&q=60" },
];

export const categories: Category[] = [
  { id: "wedding",   name: "Wedding & Celebrations", emoji: "💍", tagline: "Bridal, mehendi, hosts", eta: 90, services: 8 },
  { id: "assist",    name: "Personal Assist",         emoji: "🧑‍💼", tagline: "Errands, paperwork",   eta: 60, services: 4 },
  { id: "homecare",  name: "Home Care",               emoji: "🏠", tagline: "Caretakers, repairs",   eta: 45, services: 6 },
  { id: "beauty",    name: "Beauty & Grooming",       emoji: "💄", tagline: "Salon-grade at home",   eta: 60, services: 7 },
  { id: "tech",      name: "Tech Help",               emoji: "💻", tagline: "Laptops, wifi, devices", eta: 90, services: 4 },
  { id: "cooking",   name: "Cooking & Food",          emoji: "🍳", tagline: "Chefs & meal prep",     eta: 120, services: 5 },
  { id: "baby",      name: "Baby & Child Care",       emoji: "🍼", tagline: "Nannies, sitters",      eta: 60, services: 3 },
  { id: "fitness",   name: "Fitness & Yoga",          emoji: "🧘", tagline: "Trainers at home",      eta: 60, services: 4 },
  { id: "cleaning",  name: "Cleaning & Pest Control", emoji: "🧹", tagline: "Deep clean & sanitize", eta: 30, services: 6 },
  { id: "wellness",  name: "Wellness",                emoji: "💆", tagline: "Massage & spa",         eta: 60, services: 5 },
];

const svc = (id: string, c: string, n: string, d: string, p: number, dur: number, r: number, rev: number, opts: Partial<Service> = {}): Service => ({
  id, sku: `SVC#${id}`, categoryId: c, name: n, desc: d, price: p, duration: dur, rating: r, reviews: rev,
  included: opts.included ?? ["Trained associate on-site", "All consumables", "Quality re-check"],
  notIncluded: opts.notIncluded ?? ["Heavy materials", "Spare parts"],
  ...opts,
});

export const services: Service[] = [
  svc("613B2AA2", "wedding", "Bridal Makeup — HD", "Full HD bridal makeup with airbrush finish. Includes hair styling & draping assistance.", 7999, 180, 4.9, 234, {
    featured: true, popular: true,
    image: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=900&q=70",
    included: ["HD makeup, hair styling, draping help, touch-up kit, false lashes"],
    notIncluded: ["Saree/lehenga, jewellery"],
  }),
  svc("54E9ED12", "wedding", "Bridal Mehendi", "Intricate bridal mehendi for hands & feet by a senior artist.", 3999, 180, 4.8, 188, {
    popular: true, image: "https://images.unsplash.com/photo-1610132687181-1b78a4f76e8a?w=900&q=70",
  }),
  svc("247303C1", "wellness", "Deep Tissue Massage", "90-min therapeutic deep tissue massage by certified therapist.", 1999, 90, 4.9, 412, {
    popular: true, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=70",
  }),
  svc("B941D153", "homecare", "Elderly Companion Care", "Trained caretaker for elderly — companionship, light assistance.", 699, 180, 4.7, 92, {
    image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=900&q=70",
  }),
  svc("A11C0001", "cooking", "Personal Chef", "South Indian / North Indian / Continental — at your kitchen.", 2499, 180, 4.8, 56, {
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=70",
  }),
  svc("A11C0002", "cleaning", "Quick Touch-up Clean", "15-min targeted clean before guests arrive.", 299, 15, 4.6, 411, {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=70",
  }),
  svc("A11C0003", "cleaning", "Deep Home Cleaning", "2 BHK · 3 hrs · 2 associates.", 1499, 180, 4.9, 2103, { popular: true }),
  svc("A11C0004", "beauty", "Salon Hair & Style", "Wash, cut, blow-dry by senior stylist.", 1299, 75, 4.8, 902),
  svc("A11C0005", "beauty", "Mani + Pedi", "Spa-grade · 75 min.", 999, 75, 4.7, 1102),
  svc("A11C0006", "tech", "WiFi & Network Fix", "Router config + speed test.", 399, 45, 4.6, 188),
  svc("A11C0007", "fitness", "Private Yoga", "60 min · certified instructor.", 1199, 60, 4.8, 214),
  svc("A11C0008", "assist", "Document Pickup", "Within 5 km.", 249, 60, 4.7, 156),
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);
export const serviceById = (id: string) => services.find((s) => s.id === id);
export const servicesByCategory = (id: string) => services.filter((s) => s.categoryId === id);
export const popularServices = () => services.filter((s) => s.popular);
export const cityById = (id: string) => cities.find((c) => c.id === id);

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

// Time-slot helpers
export function nextDates(count = 7) {
  const out: { iso: string; d: number; mon: string; dow: string }[] = [];
  const today = new Date();
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const dows = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  for (let i = 0; i < count; i++) {
    const dt = new Date(today);
    dt.setDate(today.getDate() + i);
    out.push({ iso: dt.toISOString().slice(0,10), d: dt.getDate(), mon: months[dt.getMonth()], dow: dows[dt.getDay()] });
  }
  return out;
}

export function timeSlots(period: "morning" | "afternoon" | "evening") {
  const ranges = {
    morning:   [7, 12],
    afternoon: [12, 17],
    evening:   [17, 21],
  } as const;
  const [from, to] = ranges[period];
  const out: { label: string; disabled?: boolean }[] = [];
  for (let h = from; h < to; h++) {
    for (const m of [0, 30]) {
      const hr12 = ((h + 11) % 12) + 1;
      const ampm = h < 12 ? "AM" : "PM";
      const label = `${String(hr12).padStart(2,"0")}:${String(m).padStart(2,"0")} ${ampm}`;
      out.push({ label, disabled: period === "afternoon" && h >= 15 && Math.random() > 0.5 });
    }
  }
  return out;
}
