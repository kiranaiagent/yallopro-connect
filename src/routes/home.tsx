import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Zap, Calendar, Repeat, Star, Plus, Sparkles, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { categories, popularServices, services, inr, cityById } from "@/lib/yallo-data";
import { useCart, cartTotals } from "@/lib/cart-store";
import { useState } from "react";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — YallO" }] }),
  component: HomePage,
});

function HomePage() {
  const items = useCart((s) => s.items);
  const add = useCart((s) => s.add);
  const setMode = useCart((s) => s.setMode);
  const mode = useCart((s) => s.mode);
  const cityId = useCart((s) => s.cityId);
  const city = cityId ? cityById(cityId) : null;
  const { count } = cartTotals(items);
  const popular = popularServices().slice(0, 6);
  const now = new Date();
  const date = now.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

  const inCart = (id: string) => items.some((i) => i.serviceId === id);

  return (
    <AppShell>
      <main className="px-5 pt-4 pb-4">
        {/* date + time */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
          {date} · {time}
        </p>

        {/* search */}
        <div className="mt-3 flex items-center gap-3 rounded-2xl glass-strong px-4 py-3.5">
          <Search className="size-4 text-primary" />
          <input placeholder="Search services, categories…"
            className="flex-1 bg-transparent outline-none text-sm uppercase tracking-wider placeholder:text-muted-foreground" />
        </div>

        {/* YallO Plus banner */}
        <div className="mt-4 rounded-2xl p-4 surface-gold relative overflow-hidden">
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/30 blur-2xl" />
          <p className="relative font-bold">YallO Plus <span className="text-muted-foreground font-medium">— save every time</span></p>
          <p className="relative text-xs text-muted-foreground mt-1">10% off all services · 2 free visits/month · Priority slots</p>
        </div>

        {/* Hot offers */}
        <SectionHead title="Hot Offers" action="See all" />
        <div className="rounded-2xl glass-strong p-5 relative overflow-hidden">
          <div className="absolute -right-8 -top-10 size-32 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute top-3 right-3 surface-gold rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-primary">Offer</div>
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
              <Sparkles className="size-3" /> Special Offer
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight">New User Special</h2>
            <p className="mt-1 text-xs text-muted-foreground">Get ₹100 off on your first booking with code <span className="font-mono font-semibold text-foreground">WELCOME100</span></p>
            <Link to="/categories" className="mt-3 inline-flex items-center gap-2 gold-gradient text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold">
              Book Now <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* mode tabs */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <ModeTab active={mode==="instant"} onClick={() => setMode("instant")} icon={<Zap className="size-4" />} label="Instant" />
          <ModeTab active={mode==="scheduled"} onClick={() => setMode("scheduled")} icon={<Calendar className="size-4" />} label="Scheduled" />
          <ModeTab active={mode==="recurring"} onClick={() => setMode("recurring")} icon={<Repeat className="size-4" />} label="Recurring" />
        </div>

        {/* popular services */}
        <SectionHead title="Popular Services" action="See all" />
        <div className="grid grid-cols-2 gap-3">
          {popular.map((s) => (
            <div key={s.id} className="rounded-2xl glass-strong overflow-hidden">
              <Link to="/service/$serviceId" params={{ serviceId: s.id }} className="block relative aspect-[4/3] bg-card-elevated">
                {s.image ? (
                  <img src={s.image} alt={s.name} loading="lazy" className="absolute inset-0 size-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-4xl">{categories.find(c=>c.id===s.categoryId)?.emoji}</div>
                )}
                <span className="absolute top-2 right-2 surface-gold rounded-full px-2 py-0.5 text-[10px] inline-flex items-center gap-1 font-semibold">
                  <Star className="size-3 fill-primary text-primary" /><span className="font-mono">{s.rating}</span>
                </span>
              </Link>
              <div className="p-3">
                <p className="font-semibold text-sm leading-tight line-clamp-1">{s.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">{s.duration} min</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono font-bold text-primary text-sm">{inr(s.price)}</span>
                  <button onClick={() => add(s.id)}
                    className={`text-xs uppercase tracking-wider font-semibold rounded-full px-3 py-1.5 inline-flex items-center gap-1 ${inCart(s.id) ? "gold-gradient text-primary-foreground" : "surface-gold text-primary"}`}>
                    <Plus className="size-3" /> {inCart(s.id) ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* categories */}
        <SectionHead title="Categories" action="See all" actionTo="/categories" />
        <div className="grid grid-cols-3 gap-2.5">
          {categories.slice(0, 9).map((c) => (
            <Link key={c.id} to="/services/$categoryId" params={{ categoryId: c.id }}
              className="rounded-2xl glass-strong aspect-square p-3 flex flex-col justify-between active:scale-95 transition">
              <div className="text-2xl">{c.emoji}</div>
              <p className="text-[11px] font-semibold leading-tight">{c.name}</p>
            </Link>
          ))}
        </div>

        {city && (
          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Showing services for <span className="text-primary font-semibold">{city.name}</span>
          </p>
        )}
        {count > 0 && (
          <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
            {count} item{count>1?"s":""} in cart
          </p>
        )}
      </main>
    </AppShell>
  );
}

function ModeTab({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`rounded-2xl py-3 px-2 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold transition ${
        active ? "gold-gradient text-primary-foreground shadow-[var(--shadow-glow)]" : "glass-strong text-muted-foreground"
      }`}>
      {icon}{label}
    </button>
  );
}

function SectionHead({ title, action, actionTo }: { title: string; action?: string; actionTo?: "/categories" }) {
  return (
    <div className="flex items-end justify-between mt-6 mb-3">
      <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{title}</h3>
      {action && (
        actionTo ? <Link to={actionTo} className="text-xs uppercase tracking-wider text-primary font-semibold border border-primary/40 rounded-full px-3 py-1">{action}</Link>
                 : <button className="text-xs uppercase tracking-wider text-primary font-semibold border border-primary/40 rounded-full px-3 py-1">{action}</button>
      )}
    </div>
  );
}

// touch usage to silence import noise
void services;
