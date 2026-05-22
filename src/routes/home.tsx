import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Bolt, Calendar, ArrowRight, Star } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { categories, popularServices, inr } from "@/lib/yallo-data";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — YallO" },
      { name: "description", content: "Pick a category or quick-book an associate." },
    ],
  }),
  component: HomePage,
});

const quick = [
  { label: "30 min", mins: 30, icon: Bolt, hint: "Fastest" },
  { label: "1 hour", mins: 60, icon: Bolt, hint: "Soon" },
  { label: "2 hours", mins: 120, icon: Bolt, hint: "Later" },
  { label: "Schedule", mins: 0, icon: Calendar, hint: "Pick time" },
];

function HomePage() {
  const popular = popularServices();
  return (
    <AppShell>
      <main className="px-5 pt-4 pb-4">
        {/* greeting */}
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Good evening</p>
          <h1 className="text-2xl font-bold mt-1">What can we get done?</h1>
        </div>

        {/* search */}
        <Link
          to="/categories"
          className="mt-5 flex items-center gap-3 rounded-2xl bg-card border border-border px-4 py-3.5"
        >
          <Search className="size-4 text-primary" />
          <span className="text-sm text-muted-foreground uppercase tracking-wider">
            Search services, pros…
          </span>
        </Link>

        {/* hero offer */}
        <div className="mt-5 rounded-3xl p-5 relative overflow-hidden border border-primary/30"
             style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 18%, var(--card)), var(--card))" }}>
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">Diwali special</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight">Deep cleaning<br/>at ₹999 only</h2>
            <p className="mt-1 text-sm text-muted-foreground">First-time customers · code SHINE</p>
            <Link to="/services/$categoryId" params={{ categoryId: "cleaning" }}
                  className="mt-4 inline-flex items-center gap-2 gold-gradient text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold">
              Claim offer <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* quick book */}
        <SectionHead title="Quick Book" hint="How fast?" />
        <div className="grid grid-cols-4 gap-2">
          {quick.map((q) => {
            const Icon = q.icon;
            return (
              <Link key={q.label} to="/categories"
                    className="rounded-2xl border border-border bg-card p-3 flex flex-col items-center gap-1.5 active:scale-95 transition">
                <span className="size-9 rounded-xl surface-gold grid place-items-center">
                  <Icon className="size-4 text-primary" />
                </span>
                <span className="text-[11px] font-semibold">{q.label}</span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">{q.hint}</span>
              </Link>
            );
          })}
        </div>

        {/* categories */}
        <SectionHead title="Categories" actionLabel="See all" actionTo="/categories" />
        <div className="grid grid-cols-3 gap-2.5">
          {categories.slice(0, 6).map((c) => (
            <Link key={c.id} to="/services/$categoryId" params={{ categoryId: c.id }}
                  className="rounded-2xl border border-border bg-card aspect-square p-3 flex flex-col justify-between active:scale-95 transition">
              <div className="text-2xl">{c.emoji}</div>
              <div>
                <p className="text-[12px] font-semibold leading-tight">{c.name}</p>
                <p className="text-[10px] mt-1 text-success font-mono">{c.eta} min</p>
              </div>
            </Link>
          ))}
        </div>

        {/* popular */}
        <SectionHead title="Popular" actionLabel="View" actionTo="/categories" />
        <div className="space-y-2.5">
          {popular.map((s) => (
            <Link key={s.id} to="/services/$categoryId" params={{ categoryId: s.categoryId }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="size-12 rounded-xl bg-card-elevated grid place-items-center text-xl">
                {categories.find((c) => c.id === s.categoryId)?.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{s.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Star className="size-3 fill-primary text-primary" />
                  <span className="font-mono">{s.rating}</span>
                  <span>·</span>
                  <span>{s.reviews.toLocaleString("en-IN")}</span>
                </p>
              </div>
              <div className="font-mono font-semibold text-primary">{inr(s.price)}</div>
            </Link>
          ))}
        </div>
      </main>
    </AppShell>
  );
}

function SectionHead({ title, actionLabel, actionTo, hint }: { title: string; actionLabel?: string; actionTo?: "/categories"; hint?: string }) {
  return (
    <div className="flex items-end justify-between mt-7 mb-3">
      <h3 className="text-base font-bold">{title}</h3>
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="text-xs uppercase tracking-wider text-primary font-semibold">{actionLabel}</Link>
      ) : hint ? (
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  );
}
