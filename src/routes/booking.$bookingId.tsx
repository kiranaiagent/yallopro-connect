import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Star, MessageCircle, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { inr } from "@/lib/yallo-data";

export const Route = createFileRoute("/booking/$bookingId")({
  head: ({ params }) => ({
    meta: [{ title: `Booking ${params.bookingId} — YallO` }],
  }),
  component: BookingDetailsPage,
});

function BookingDetailsPage() {
  const { bookingId } = Route.useParams();
  return (
    <AppShell>
      <main className="px-5 pt-2 pb-4">
        <Link to="/home" className="inline-flex items-center gap-2 text-sm text-muted-foreground py-2">
          <ArrowLeft className="size-4" /> Home
        </Link>

        {/* header */}
        <div className="mt-2 flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Booking</p>
            <p className="font-mono text-primary font-semibold mt-1">{bookingId}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold"
                style={{ background: "color-mix(in oklab, var(--success) 15%, transparent)", color: "var(--success)" }}>
            <span className="size-1.5 rounded-full bg-current animate-pulse" /> En route
          </span>
        </div>

        {/* associate */}
        <div className="mt-5 rounded-3xl p-5 border border-primary/30 relative overflow-hidden"
             style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 14%, var(--card)), var(--card))" }}>
          <div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="relative">
              <div className="size-14 rounded-full bg-card-elevated grid place-items-center text-xl font-bold text-primary">RK</div>
              <span className="absolute -bottom-0.5 -right-0.5 size-5 rounded-full gold-gradient grid place-items-center">
                <ShieldCheck className="size-3 text-primary-foreground" />
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Rakesh K.</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Star className="size-3 fill-primary text-primary" />
                <span className="font-mono">4.92</span>
                <span>· 1,284 jobs</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button className="size-10 rounded-full bg-card-elevated grid place-items-center text-primary"><Phone className="size-4" /></button>
              <button className="size-10 rounded-full bg-card-elevated grid place-items-center text-primary"><MessageCircle className="size-4" /></button>
            </div>
          </div>

          {/* ETA pill */}
          <div className="relative mt-4 flex items-center justify-between rounded-2xl bg-background/40 border border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <span className="text-sm font-semibold">Arriving in <span className="font-mono text-primary">12 min</span></span>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">2.4 km away</span>
          </div>
        </div>

        {/* map placeholder */}
        <div className="mt-4 rounded-2xl overflow-hidden border border-border aspect-[16/10] relative"
             style={{ background: "radial-gradient(circle at 30% 40%, color-mix(in oklab, var(--primary) 30%, var(--card)), var(--card) 60%)" }}>
          <div className="absolute inset-0 opacity-30"
               style={{ backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute left-[30%] top-[40%] size-3 rounded-full gold-gradient ring-4 ring-primary/30" />
          <div className="absolute left-[68%] top-[65%] size-3 rounded-full bg-success ring-4 ring-success/30" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 30 40 Q 50 30 68 65" stroke="var(--primary)" strokeWidth="0.6" strokeDasharray="2 2" fill="none" />
          </svg>
        </div>

        {/* address */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-4 flex items-start gap-3">
          <div className="size-10 rounded-xl surface-gold grid place-items-center"><MapPin className="size-4 text-primary" /></div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Service at</p>
            <p className="font-semibold text-sm mt-0.5">Home · HSR Layout</p>
            <p className="text-xs text-muted-foreground">Sector 6, 27th Main · Bengaluru 560102</p>
          </div>
        </div>

        {/* items */}
        <h3 className="mt-7 mb-3 text-base font-bold">Booked items</h3>
        <div className="space-y-2.5">
          <ItemRow name="Deep Home Cleaning" desc="2 BHK · 3 hrs" price={1499} />
          <ItemRow name="Sofa Shampoo" desc="3-seater · steam" price={799} />
        </div>

        {/* payment */}
        <h3 className="mt-7 mb-3 text-base font-bold">Payment</h3>
        <div className="rounded-2xl border border-border bg-card p-4 space-y-2 text-sm">
          <Row label="Subtotal" value={inr(2298)} />
          <Row label="Taxes (5%)" value={inr(115)} />
          <Row label="Platform fee" value={inr(29)} />
          <div className="h-px bg-border my-2" />
          <Row label="Total" value={inr(2442)} bold />
          <div className="mt-3 inline-flex items-center gap-2 surface-gold rounded-full px-3 py-1.5 text-[11px] uppercase tracking-wider text-primary font-semibold">
            Pay after service · UPI / Card
          </div>
        </div>

        <button className="mt-6 w-full rounded-2xl border border-destructive/40 text-destructive py-3.5 text-sm font-semibold uppercase tracking-wider">
          Cancel booking
        </button>
      </main>
    </AppShell>
  );
}

function ItemRow({ name, desc, price }: { name: string; desc: string; price: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex justify-between gap-3">
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </div>
      <div className="font-mono font-semibold text-primary">{inr(price)}</div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-bold" : "text-muted-foreground"}>{label}</span>
      <span className={`font-mono ${bold ? "font-bold text-primary" : ""}`}>{value}</span>
    </div>
  );
}
