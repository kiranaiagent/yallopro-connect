import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MapPin, Clock, Phone } from "lucide-react";
import { AppShell } from "@/components/AppShell";

type Search = { ref?: string };

export const Route = createFileRoute("/booking/confirmation")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ref: typeof s.ref === "string" ? s.ref : undefined,
  }),
  head: () => ({ meta: [{ title: "Booking confirmed — YallO" }] }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { ref = "YALLO#XXXXXXXX" } = Route.useSearch();
  return (
    <AppShell>
      <main className="px-5 pt-6 pb-4">
        {/* success hero */}
        <div className="relative rounded-3xl p-7 text-center overflow-hidden border border-primary/30"
             style={{ background: "linear-gradient(160deg, color-mix(in oklab, var(--primary) 22%, var(--card)), var(--card))" }}>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 size-40 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex flex-col items-center">
            <div className="size-16 rounded-full gold-gradient grid place-items-center shadow-[var(--shadow-glow)]">
              <Check className="size-8 text-primary-foreground" strokeWidth={3} />
            </div>
            <h1 className="mt-5 text-2xl font-bold">You're all set!</h1>
            <p className="mt-1 text-sm text-muted-foreground max-w-[26ch]">
              We're matching you with a verified associate nearby.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/40 px-3 py-1.5">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Booking</span>
              <span className="font-mono text-primary font-semibold text-sm">{ref}</span>
            </div>
          </div>
        </div>

        {/* timeline */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-5">
          <Step done label="Booking placed" hint="Just now" />
          <Step active label="Finding associate" hint="Usually under 2 min" />
          <Step label="On the way" />
          <Step label="Service complete" last />
        </div>

        {/* details */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-4 space-y-3">
          <Detail icon={<Clock className="size-4 text-primary" />} label="Arriving" value="In 30 minutes · today" />
          <Detail icon={<MapPin className="size-4 text-primary" />} label="At" value="Home · HSR Layout, Bengaluru" />
          <Detail icon={<Phone className="size-4 text-primary" />} label="We'll call" value="+91 98•••• ••42" />
        </div>

        <Link
          to="/booking/$bookingId"
          params={{ bookingId: ref }}
          className="mt-6 block w-full gold-gradient text-primary-foreground text-center rounded-2xl py-4 font-semibold shadow-[var(--shadow-glow)]"
        >
          Track booking
        </Link>
        <Link
          to="/home"
          className="mt-3 block w-full text-center border border-border rounded-2xl py-3.5 text-sm font-medium text-muted-foreground"
        >
          Back to home
        </Link>
      </main>
    </AppShell>
  );
}

function Step({ done, active, label, hint, last }: { done?: boolean; active?: boolean; label: string; hint?: string; last?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`size-7 rounded-full grid place-items-center text-[11px] font-bold ${
          done ? "gold-gradient text-primary-foreground" :
          active ? "surface-gold text-primary animate-pulse" :
          "bg-card-elevated text-muted-foreground"
        }`}>
          {done ? <Check className="size-3.5" /> : active ? "●" : "○"}
        </div>
        {!last && <div className="w-px flex-1 bg-border my-1" />}
      </div>
      <div className={`pb-5 flex-1 ${last ? "pb-0" : ""}`}>
        <p className={`text-sm font-semibold ${active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`}>{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground mt-0.5">{hint}</p>}
      </div>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-9 rounded-xl surface-gold grid place-items-center">{icon}</div>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
