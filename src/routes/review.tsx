import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Calendar, Lock, Tag } from "lucide-react";
import { useCart, cartTotals, makeBookingRef } from "@/lib/cart-store";
import { inr, cityById } from "@/lib/yallo-data";
import { useState } from "react";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Order review — YallO" }] }),
  component: ReviewPage,
});

function ReviewPage() {
  const items = useCart((s) => s.items);
  const cityId = useCart((s) => s.cityId);
  const promo = useCart((s) => s.promo);
  const setPromo = useCart((s) => s.setPromo);
  const setBookingRef = useCart((s) => s.setBookingRef);
  const clear = useCart((s) => s.clear);
  const { lines, subtotal, discount, tax, platformFee, total } = cartTotals(items, promo);
  const city = cityId ? cityById(cityId) : null;
  const nav = useNavigate();
  const [code, setCode] = useState(promo ?? "");
  const [agree, setAgree] = useState(false);

  function confirm() {
    if (!agree) return;
    const ref = makeBookingRef();
    setBookingRef(ref);
    clear();
    nav({ to: "/booking/confirmation", search: { ref } });
  }

  if (lines.length === 0) {
    return (
      <div className="min-h-dvh flex justify-center">
        <div className="w-full max-w-[440px] p-8 text-center">
          <p className="text-muted-foreground">Cart is empty.</p>
          <Link to="/home" className="mt-4 inline-flex gold-gradient text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold">Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex justify-center">
      <div className="w-full max-w-[440px] min-h-dvh border-x border-white/30 pb-10">
        <div className="sticky top-0 z-30 glass border-b border-white/40 px-4 py-3 flex items-center gap-3">
          <Link to="/cart" className="size-9 rounded-full surface-gold grid place-items-center"><ArrowLeft className="size-4 text-primary" /></Link>
          <h1 className="flex-1 text-center text-sm font-bold uppercase tracking-[0.18em]">Order Review</h1>
          <span className="size-9" />
        </div>

        <main className="px-5 pt-4">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary">Service location</p>
          <div className="mt-2 rounded-2xl glass-strong p-3 flex items-center gap-3">
            <span className="size-9 rounded-xl surface-gold grid place-items-center"><MapPin className="size-4 text-primary" /></span>
            <p className="font-semibold text-sm">{city?.name ?? "—"}, {city?.region ?? ""}</p>
          </div>

          <div className="mt-4 rounded-2xl glass-strong divide-y divide-border">
            {lines.map(({ service, slot }) => (
              <div key={service.id} className="p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{service.sku}</p>
                <p className="font-bold mt-1">{service.name}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-primary font-semibold">
                  <Calendar className="size-3.5" />
                  {slot ? `${slot.date} · ${slot.time}` : "Slot not selected"}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[11px] uppercase tracking-wider text-muted-foreground">Promo code</p>
          <div className="mt-1.5 flex gap-2">
            <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="WELCOME100"
              className="flex-1 rounded-xl border border-border bg-card px-3 py-2.5 font-mono text-sm outline-none focus:border-primary" />
            <button onClick={() => setPromo(code)} className="gold-gradient text-primary-foreground rounded-xl px-5 text-sm font-semibold uppercase tracking-wider">Apply</button>
          </div>
          {promo && discount > 0 && (
            <p className="mt-1.5 text-[11px] text-success inline-flex items-center gap-1"><Tag className="size-3" /> {promo} applied · -{inr(discount)}</p>
          )}

          <p className="mt-5 text-[11px] uppercase tracking-[0.2em] font-bold text-primary">Price breakdown</p>
          <div className="mt-2 rounded-2xl glass-strong p-4 text-sm">
            {lines.map(({ service, lineTotal }) => (
              <div key={service.id} className="flex justify-between py-1">
                <span>{service.name}</span>
                <span className="font-mono">{inr(lineTotal)}</span>
              </div>
            ))}
            {discount > 0 && (
              <div className="flex justify-between py-1 text-success">
                <span>Discount</span><span className="font-mono">-{inr(discount)}</span>
              </div>
            )}
            <div className="flex justify-between py-1"><span>Tax (18%)</span><span className="font-mono">{inr(tax)}</span></div>
            <div className="flex justify-between py-1"><span>Platform fee</span><span className="font-mono">{inr(platformFee)}</span></div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between">
              <span className="font-bold">Total Payable</span>
              <span className="font-mono font-bold text-primary text-lg">{inr(total)}</span>
            </div>
          </div>

          <div className="mt-4 rounded-2xl surface-gold p-4 flex items-start gap-3">
            <span className="size-9 rounded-xl bg-card grid place-items-center"><Lock className="size-4 text-primary" /></span>
            <div className="text-sm">
              <p className="font-semibold">Secure Payment via Razorpay</p>
              <p className="text-xs text-muted-foreground mt-0.5">Your payment details are encrypted and processed securely. YallO never stores your card information.</p>
            </div>
          </div>

          <label className="mt-4 flex items-start gap-3 text-xs">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 size-4 accent-[color:var(--primary)]" />
            <span className="text-muted-foreground">
              I agree to YallO's <span className="text-primary font-semibold">TERMS & CONDITIONS</span> and <span className="text-primary font-semibold">CANCELLATION POLICY</span>. By confirming, I authorize YallO to charge the above amount.
            </span>
          </label>

          <button onClick={confirm} disabled={!agree}
            className="mt-5 w-full gold-gradient text-primary-foreground rounded-2xl py-4 font-bold shadow-[var(--shadow-glow)] disabled:opacity-50">
            Confirm & Pay {inr(total)}
          </button>
        </main>
      </div>
    </div>
  );
}
