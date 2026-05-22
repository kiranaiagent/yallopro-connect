import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, Minus, Lock, Phone, MapPin, Zap, Calendar, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useCart, cartTotals } from "@/lib/cart-store";
import { inr, cityById, nextDates, timeSlots } from "@/lib/yallo-data";
import { useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — YallO" }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const mode = useCart((s) => s.mode);
  const setMode = useCart((s) => s.setMode);
  const cityId = useCart((s) => s.cityId);
  const phone = useCart((s) => s.phone);
  const address = useCart((s) => s.address);
  const setAddress = useCart((s) => s.setAddress);
  const setItemSlot = useCart((s) => s.setItemSlot);
  const authed = useCart((s) => s.authed);
  const { lines, total, count } = cartTotals(items);
  const city = cityId ? cityById(cityId) : null;
  const nav = useNavigate();

  const dates = nextDates(7);
  const [selectedDate, setSelectedDate] = useState(dates[0].iso);
  const morning = timeSlots("morning");
  const afternoon = timeSlots("afternoon");
  const evening = timeSlots("evening");

  if (count === 0) {
    return (
      <AppShell title="Cart">
        <main className="px-5 pt-4">
          <div className="mt-10 rounded-3xl glass-strong p-8 text-center">
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

  function onContinue() {
    if (!phone && !authed) nav({ to: "/login" });
    else nav({ to: "/review" });
  }

  return (
    <AppShell title="Cart">
      <main className="px-5 pt-3 pb-4">
        {/* service area locked */}
        <div className="rounded-2xl glass-strong p-3 flex items-start gap-3">
          <span className="size-9 rounded-xl surface-gold grid place-items-center"><Lock className="size-4 text-primary" /></span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Service area: <span className="text-foreground">{city?.name ?? "—"} (locked)</span></p>
            <p className="text-xs text-muted-foreground mt-0.5">Switching cities will clear your cart</p>
          </div>
        </div>

        {/* phone */}
        <Link to="/login" className="mt-3 block rounded-2xl border-2 border-primary/40 bg-card p-3 flex items-start gap-3">
          <span className="size-9 rounded-xl surface-gold grid place-items-center"><Phone className="size-4 text-primary" /></span>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Mobile number</p>
            <p className="font-mono text-primary font-semibold text-sm mt-0.5">{phone ?? "10-digit mobile"}</p>
            <p className="text-[11px] text-muted-foreground">We'll send a 6-digit code to verify this number.</p>
          </div>
          <ChevronRight className="size-4 text-primary mt-2" />
        </Link>

        {/* address */}
        <div className="mt-3 rounded-2xl border-2 border-primary/40 bg-card p-3 flex items-start gap-3">
          <span className="size-9 rounded-xl surface-gold grid place-items-center"><MapPin className="size-4 text-primary" /></span>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Service address</p>
            <input value={address ?? ""} onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter or select your address"
              className="w-full mt-0.5 bg-transparent outline-none text-sm text-primary font-semibold placeholder:text-primary/70" />
          </div>
        </div>

        {/* mode */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <ModeBtn icon={<Zap className="size-4" />} label="Instant" active={mode==="instant"} onClick={() => setMode("instant")} />
          <ModeBtn icon={<Calendar className="size-4" />} label="Scheduled" active={mode==="scheduled"} onClick={() => setMode("scheduled")} />
        </div>

        {/* items */}
        <div className="mt-4 space-y-2.5">
          {lines.map(({ service, qty }) => (
            <div key={service.id} className="rounded-2xl glass-strong p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{service.sku}</p>
              <div className="mt-1 flex items-start justify-between gap-3">
                <p className="font-bold flex-1">{service.name}</p>
                <p className="font-mono font-bold text-primary">{inr(service.price)}</p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full border border-primary/40 bg-card px-1">
                  <button onClick={() => setQty(service.id, qty - 1)} className="size-7 grid place-items-center text-primary"><Minus className="size-3.5" /></button>
                  <span className="font-mono font-semibold w-4 text-center text-sm">{qty}</span>
                  <button onClick={() => setQty(service.id, qty + 1)} className="size-7 grid place-items-center text-primary"><Plus className="size-3.5" /></button>
                </div>
                <button className="ml-auto text-[11px] uppercase tracking-wider border border-border rounded-full px-3 py-1.5 text-muted-foreground">Save for later</button>
                <button onClick={() => remove(service.id)} className="text-[11px] uppercase tracking-wider border border-destructive/40 rounded-full px-3 py-1.5 text-destructive">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* slot picker */}
        {mode === "scheduled" && (
          <>
            <SlotHeader title="Service time" sub="Pick a time slot" hint={`${morning.length + afternoon.length + evening.length} available`} />
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar">
              {dates.map((d) => {
                const active = selectedDate === d.iso;
                return (
                  <button key={d.iso} onClick={() => setSelectedDate(d.iso)}
                    className={`shrink-0 rounded-xl px-3 py-2 text-center min-w-[52px] ${active ? "gold-gradient text-primary-foreground shadow-[var(--shadow-glow)]" : "glass-strong text-muted-foreground"}`}>
                    <p className="text-[10px] uppercase tracking-wider font-bold">{d.mon}</p>
                    <p className="font-mono font-bold text-lg leading-none my-0.5">{d.d}</p>
                    <p className="text-[10px] uppercase tracking-wider">{d.dow}</p>
                  </button>
                );
              })}
            </div>

            <Period label="Morning"   slots={morning}   count={morning.filter(s=>!s.disabled).length}   onPick={(t) => lines.forEach(l => setItemSlot(l.service.id, { date: selectedDate, time: t }))} />
            <Period label="Afternoon" slots={afternoon} count={afternoon.filter(s=>!s.disabled).length} onPick={(t) => lines.forEach(l => setItemSlot(l.service.id, { date: selectedDate, time: t }))} />
            <Period label="Evening"   slots={evening}   count={evening.filter(s=>!s.disabled).length}   onPick={(t) => lines.forEach(l => setItemSlot(l.service.id, { date: selectedDate, time: t }))} />
          </>
        )}

        <Link to="/categories" className="mt-5 block w-full rounded-2xl border-2 border-dashed border-primary/40 surface-gold py-3.5 text-center font-semibold text-primary uppercase tracking-wider text-sm">
          + Add more services
        </Link>

        <button onClick={onContinue}
          className="mt-4 w-full gold-gradient text-primary-foreground rounded-2xl py-4 font-semibold shadow-[var(--shadow-glow)]">
          {phone ? `Continue · ${inr(total)}` : "Enter contact number"}
        </button>
        <p className="text-center text-[11px] text-muted-foreground mt-2 uppercase tracking-wider">
          Prices include tax 18% and platform fee 2%
        </p>
      </main>
    </AppShell>
  );
}

function ModeBtn({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`rounded-2xl py-3 flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-semibold ${
        active ? "gold-gradient text-primary-foreground shadow-[var(--shadow-glow)]" : "glass-strong text-muted-foreground"
      }`}>
      {icon}{label}
    </button>
  );
}

function SlotHeader({ title, sub, hint }: { title: string; sub: string; hint: string }) {
  return (
    <div className="mt-6 flex items-end justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{title}</p>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{sub}</p>
      </div>
      <span className="text-[11px] text-success font-mono">{hint}</span>
    </div>
  );
}

function Period({ label, slots, count, onPick }: { label: string; slots: { label: string; disabled?: boolean }[]; count: number; onPick: (t: string) => void }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{label}</p>
        <span className="text-[11px] text-success font-mono">{count} available</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {slots.map((s) => (
          <button key={s.label} disabled={s.disabled} onClick={() => onPick(s.label)}
            className={`rounded-lg py-2 text-[11px] font-mono ${s.disabled ? "text-muted-foreground line-through opacity-60 bg-muted" : "glass-strong text-foreground hover:text-primary"}`}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
