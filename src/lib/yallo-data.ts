// Mock catalog mirroring the mobile-customer domain shape.
export type Service = {
  id: string;
  categoryId: string;
  name: string;
  desc: string;
  price: number;        // INR
  duration: number;     // minutes
  rating: number;
  reviews: number;
  popular?: boolean;
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  eta: number; // mins
  services: number;
};

export const categories: Category[] = [
  { id: "cleaning",  name: "Home Cleaning",   emoji: "🧹", tagline: "Sparkling spaces, on demand",       eta: 30, services: 6 },
  { id: "repairs",   name: "Repairs",         emoji: "🔧", tagline: "Plumbing, electrical & more",        eta: 45, services: 8 },
  { id: "wellness",  name: "Wellness",        emoji: "💆", tagline: "Massage, spa, yoga at home",         eta: 60, services: 5 },
  { id: "beauty",    name: "Salon & Beauty",  emoji: "💄", tagline: "Salon-grade, at your door",          eta: 60, services: 7 },
  { id: "tech",      name: "Tech Support",    emoji: "💻", tagline: "Laptops, wifi, smart-home",          eta: 90, services: 4 },
  { id: "pets",      name: "Pet Care",        emoji: "🐾", tagline: "Grooming & walks",                   eta: 120, services: 3 },
  { id: "errands",   name: "Errands",         emoji: "🏃", tagline: "Documents, deliveries, queues",       eta: 45, services: 4 },
  { id: "concierge", name: "Concierge",       emoji: "🎩", tagline: "Premium personal assistance",         eta: 120, services: 3 },
];

export const services: Service[] = [
  // Cleaning
  { id: "svc-clean-1", categoryId: "cleaning", name: "Deep Home Cleaning", desc: "2 BHK · 3 hrs · 2 associates", price: 1499, duration: 180, rating: 4.9, reviews: 2103, popular: true },
  { id: "svc-clean-2", categoryId: "cleaning", name: "Bathroom Detail",    desc: "Per bathroom · descaling + sanitize", price: 499, duration: 60, rating: 4.8, reviews: 1430 },
  { id: "svc-clean-3", categoryId: "cleaning", name: "Kitchen Detail",     desc: "Degreasing, chimney, hood",         price: 899, duration: 120, rating: 4.7, reviews: 980 },
  { id: "svc-clean-4", categoryId: "cleaning", name: "Sofa Shampoo",       desc: "3-seater · steam + shampoo",        price: 799, duration: 75, rating: 4.6, reviews: 612 },
  // Repairs
  { id: "svc-rep-1",   categoryId: "repairs",  name: "Plumber Visit",      desc: "Diagnosis + minor fix",             price: 299, duration: 60, rating: 4.8, reviews: 1822, popular: true },
  { id: "svc-rep-2",   categoryId: "repairs",  name: "Electrician Visit",  desc: "Diagnosis + minor fix",             price: 299, duration: 60, rating: 4.8, reviews: 1654 },
  { id: "svc-rep-3",   categoryId: "repairs",  name: "AC Service",         desc: "1 unit · jet wash + gas check",     price: 599, duration: 75, rating: 4.7, reviews: 743 },
  // Wellness
  { id: "svc-well-1",  categoryId: "wellness", name: "Swedish Massage",    desc: "60 min · therapist at home",        price: 1899, duration: 60, rating: 4.9, reviews: 521, popular: true },
  { id: "svc-well-2",  categoryId: "wellness", name: "Deep Tissue",        desc: "75 min · therapist at home",        price: 2299, duration: 75, rating: 4.9, reviews: 388 },
  { id: "svc-well-3",  categoryId: "wellness", name: "Private Yoga",       desc: "60 min · certified instructor",     price: 1199, duration: 60, rating: 4.8, reviews: 214 },
  // Beauty
  { id: "svc-beauty-1",categoryId: "beauty",   name: "Salon Hair & Style", desc: "Wash, cut, blow-dry",               price: 1299, duration: 75, rating: 4.8, reviews: 902, popular: true },
  { id: "svc-beauty-2",categoryId: "beauty",   name: "Mani + Pedi",        desc: "Spa-grade · 75 min",                price: 999,  duration: 75, rating: 4.7, reviews: 1102 },
  { id: "svc-beauty-3",categoryId: "beauty",   name: "Facial · Hydrate",   desc: "Korean glow protocol",              price: 1799, duration: 60, rating: 4.9, reviews: 668 },
  // Tech
  { id: "svc-tech-1",  categoryId: "tech",     name: "Laptop Diagnostics", desc: "On-site · 30 min triage",           price: 499, duration: 30, rating: 4.7, reviews: 312 },
  { id: "svc-tech-2",  categoryId: "tech",     name: "WiFi & Network Fix", desc: "Router config + speed test",        price: 399, duration: 45, rating: 4.6, reviews: 188 },
  // Pets
  { id: "svc-pet-1",   categoryId: "pets",     name: "Dog Grooming",       desc: "Bath, blow-dry, nails",             price: 1299, duration: 90, rating: 4.9, reviews: 274 },
  // Errands
  { id: "svc-err-1",   categoryId: "errands",  name: "Document Pickup",    desc: "Within 5 km",                       price: 249, duration: 60, rating: 4.7, reviews: 156 },
  // Concierge
  { id: "svc-conc-1",  categoryId: "concierge",name: "Personal Assistant", desc: "Per hour · errands + bookings",     price: 999, duration: 60, rating: 4.9, reviews: 91, popular: true },
];

export function categoryById(id: string) {
  return categories.find((c) => c.id === id);
}
export function serviceById(id: string) {
  return services.find((s) => s.id === id);
}
export function servicesByCategory(id: string) {
  return services.filter((s) => s.categoryId === id);
}
export function popularServices() {
  return services.filter((s) => s.popular);
}

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
