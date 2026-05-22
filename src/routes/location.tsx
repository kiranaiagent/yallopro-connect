import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { MapPin, Crosshair, Globe } from "lucide-react";
import { cities } from "@/lib/yallo-data";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/location")({
  head: () => ({ meta: [{ title: "Choose your city — YallO" }] }),
  component: LocationPage,
});

function LocationPage() {
  const setCity = useCart((s) => s.setCity);
  const navigate = useNavigate();
  const pick = (id: string) => { setCity(id); navigate({ to: "/home" }); };

  const available = cities.filter((c) => c.available);
  const soon = cities.filter((c) => !c.available);

  return (
    <div className="min-h-dvh text-foreground flex justify-center">
      <div className="w-full max-w-[440px] min-h-dvh relative border-x border-white/30 pb-10">
        {/* top strip */}
        <div className="sticky top-0 z-30 glass border-b border-white/40 px-5 py-3 flex items-center justify-between">
          <button className="rounded-full surface-gold px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5">
            <Globe className="size-3.5 text-primary" /> EN
          </button>
          <Link to="/login" className="text-xs uppercase tracking-wider text-muted-foreground">
            Already a member? <span className="text-primary font-semibold underline">Sign in</span>
          </Link>
        </div>

        <main className="px-5 pt-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-primary">
              <MapPin className="size-5" />
              <h1 className="text-xl font-bold">Choose Your Location</h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">We'll show you services available in your area</p>
            <button className="mt-4 inline-flex items-center gap-2 surface-gold rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary">
              <Crosshair className="size-4" /> Use my current location
            </button>
          </div>

          <h2 className="mt-7 mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Available now</h2>
          <div className="grid grid-cols-2 gap-3">
            {available.map((c) => (
              <button key={c.id} onClick={() => pick(c.id)}
                className="group rounded-2xl overflow-hidden relative aspect-[4/5] glass-strong text-left active:scale-[0.98] transition">
                <img src={c.image} alt={c.name} loading="lazy"
                     className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="font-bold text-lg leading-tight">{c.name.toUpperCase()}</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-90 mt-0.5">{c.region}</p>
                </div>
              </button>
            ))}
          </div>

          <h2 className="mt-7 mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Coming soon</h2>
          <div className="grid grid-cols-3 gap-2">
            {soon.map((c) => (
              <div key={c.id} className="rounded-xl overflow-hidden relative aspect-square glass">
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 size-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold uppercase tracking-wider">{c.name}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
