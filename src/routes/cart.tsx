import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus, Minus, Trash2, MapPin, Clock, Tag } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useCart, cartTotals, makeBookingRef } from "@/lib/cart-store";
import { inr } from "@/lib/yallo-data";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — YallO" }, { name: "description", content: "Review your booking." }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const setBookingRef = useCart((s) => s.setBookingRef);
  const clear = useCart((s) => s.clear);
  const { lines, subtotal, tax, platformFee, total, count } = cartTotals(items);
  const navigate = useNavigate();

  function confirm() {
    const ref = makeBookingRef();
    setBookingRef(ref);
    clear();
    navigate({ to: "/booking/confirmation", search: { ref } });
  }

  if (count === 0) {
    return (
      <AppShell>
        <main className="px-5 pt-4 pb-4">
          <h1 className="text-2xl font-bold">Your cart</h1>
          <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-center">
            <div className="text-5xl mb-3">🛒</div>
            <p className="font-semibold">Nothing in here yet</p>
            <p className="text-sm text-muted-foreground mt-1">Browse categories to add a service.</p>
            <Link to="/categories" className="mt-5 inline-flex gold-gradient text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold">
              Browse categories
            </Link>
          </div>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="px-5 pt-2 pb-4">
        <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground py-2">
          <ArrowLeft className="size-4" /> Continue browsing
        </Link>
        <h1 className="text-2xl font-bold mt-2">Your cart</h1>

        {/* address */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-4 flex items-start gap-3">
          <div className="size-10 rounded-xl surface-gold grid place-items-center"><MapPin className="size-4 text-primary" /></div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Service at</p>
            <p className="font-semibold text-sm mt-0.5">Home · HSR Layout</p>
            <p className="text-xs text-muted-foreground">Sector 6, 27th Main · Bengaluru 560102</p>
          </div>
          <button className="text-xs uppercase tracking-wider text-primary font-semibold">Change</button>
        </div>

        {/* slot */}
        <div className="mt-3 rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
          <div className="size-10 rounded-xl surface-gold grid place-items-center"><Clock className="size-4 text-primary" /></div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Arriving</p>
            <p className="font-semibold text-sm mt-0.5">In 30 minutes · today</p>
          </div>
          <button className="text-xs uppercase tracking-wider text-primary font-semibold">Edit</button>
        </div>

        {/* items */}
        <h3 className="mt-7 mb-3 text-base font-bold">Items</h3>
        <div className="space-y-2.5">
          {lines.map(({ service, qty, lineTotal }) => (
            <div key={service.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{service.desc}</p>
                </div>
                <div className="font-mono font-semibold text-primary">{inr(lineTotal)}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-card-elevated px-1 py-1">
                  <button onClick={() => setQty(service.id, qty - 1)} className="size-7 grid place-items-center text-primary"><Minus className="size-3.5" /></button>
                  <span className="font-mono font-semibold w-4 text-center text-sm">{qty}</span>
                  <button onClick={() => setQty(service.id, qty + 1)} className="size-7 grid place-items-center text-primary"><Plus className="size-3.5" /></button>
                </div>
                <button onClick={() => remove(service.id)} className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-destructive">
                  <Trash2 className="size-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* promo */}
        <button className="mt-4 w-full rounded-2xl border border-dashed border-primary/40 surface-gold p-4 flex items-center gap-3 text-left">
          <Tag className="size-4 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary">Apply promo code</p>
            <p className="text-[11px] text-muted-foreground">2 offers available for you</p>
          </div>
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">Apply</span>
        </button>

        {/* totals */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-4 space-y-2 text-sm">
          <Row label="Subtotal" value={inr(subtotal)} />
          <Row label="Taxes (5%)" value={inr(tax)} />
          <Row label="Platform fee" value={inr(platformFee)} />
          <div className="h-px bg-border my-2" />
          <Row label="Total" value={inr(total)} bold />
        </div>

        <button
          onClick={confirm}
          className="mt-5 w-full gold-gradient text-primary-foreground rounded-2xl py-4 font-semibold shadow-[var(--shadow-glow)] active:scale-[0.99] transition"
        >
          Confirm & book · {inr(total)}
        </button>
        <p className="text-center text-[11px] text-muted-foreground mt-3 uppercase tracking-wider">
          Pay after service · cancel free until pro is on the way
        </p>
      </main>
    </AppShell>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-base" : "text-sm"}`}>
      <span className={bold ? "font-bold" : "text-muted-foreground"}>{label}</span>
      <span className={`font-mono ${bold ? "font-bold text-primary" : ""}`}>{value}</span>
    </div>
  );
}
