import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Zap, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YallO — Premium home services, on demand" },
      { name: "description", content: "Cleaning, repairs, wellness, beauty and concierge at your door. Verified pros, 30-min arrival." },
      { property: "og:title", content: "YallO — Premium home services" },
      { property: "og:description", content: "Verified pros at your door in 30 minutes." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-dvh bg-background text-foreground flex justify-center">
      <div className="w-full max-w-[440px] min-h-dvh relative overflow-hidden border-x border-border/40">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute top-72 -left-24 size-72 rounded-full bg-primary-glow/15 blur-3xl" />

        <div className="relative px-6 pt-10 pb-8">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-2xl gold-gradient grid place-items-center text-primary-foreground font-bold text-lg">Y</div>
            <span className="font-bold tracking-tight text-lg">YallO</span>
          </div>
        </div>

        <div className="relative px-6 pt-8">
          <div className="inline-flex items-center gap-2 surface-gold px-3 py-1.5 rounded-full text-xs uppercase tracking-wider">
            <Sparkles className="size-3.5 text-primary" /> Now in Bengaluru
          </div>
          <h1 className="mt-6 text-[44px] leading-[1.05] font-bold tracking-tight">
            Premium help,<br />
            <span className="gold-text">at your door.</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-[15px] leading-relaxed max-w-[34ch]">
            Verified associates for cleaning, repairs, wellness and more —
            arriving in as little as 30 minutes.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/home"
              className="group inline-flex items-center justify-between gold-gradient text-primary-foreground rounded-2xl px-5 py-4 font-semibold shadow-[var(--shadow-glow)] transition-transform active:scale-[0.98]"
            >
              Get started
              <span className="size-9 rounded-full bg-primary-foreground/15 grid place-items-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center rounded-2xl border border-border bg-card/60 px-5 py-4 font-medium text-foreground"
            >
              Browse categories
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2">
            <Stat icon={<Zap className="size-4" />} value="30 min" label="Arrival" />
            <Stat icon={<ShieldCheck className="size-4" />} value="100%" label="Verified" />
            <Stat icon={<Star className="size-4" />} value="4.9" label="Rated" />
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-card-elevated grid place-items-center text-2xl">🧹</div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Most booked</p>
                <p className="font-semibold">Deep Home Cleaning</p>
              </div>
              <div className="ml-auto font-mono text-primary font-semibold">₹1,499</div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Star className="size-3.5 fill-primary text-primary" /> 4.9 · 2,103</span>
              <span>·</span>
              <span>3 hrs · 2 associates</span>
            </div>
          </div>

          <p className="mt-8 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Tap & hold a service · pay after it's done
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-3 text-center">
      <div className="text-primary flex justify-center">{icon}</div>
      <div className="mt-1 font-mono font-semibold text-sm">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
