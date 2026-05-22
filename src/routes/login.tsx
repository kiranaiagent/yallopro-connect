import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — YallO" }] }),
  component: LoginPage,
});

function LoginPage() {
  const setPhone = useCart((s) => s.setPhone);
  const setAuthed = useCart((s) => s.setAuthed);
  const nav = useNavigate();
  const [num, setNum] = useState("");

  return (
    <div className="min-h-dvh flex justify-center">
      <div className="w-full max-w-[440px] min-h-dvh border-x border-white/30 px-5 py-8 relative">
        <div className="pointer-events-none absolute -top-20 right-0 size-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 justify-center">
            <div className="size-12 rounded-2xl gold-gradient grid place-items-center text-primary-foreground font-bold text-xl shadow-[var(--shadow-glow)]">Y</div>
            <div className="text-left">
              <p className="font-bold text-2xl gold-text leading-none">YallO</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-1">Live Better</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl glass-strong p-6">
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Sign in to continue</p>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5">
            <span className="font-mono text-sm font-semibold text-primary">+91</span>
            <input
              type="tel" inputMode="numeric" maxLength={10}
              value={num} onChange={(e) => setNum(e.target.value.replace(/\D/g, ""))}
              placeholder="10-digit mobile"
              className="flex-1 bg-transparent outline-none font-mono text-sm tracking-wide placeholder:text-muted-foreground"
            />
          </div>

          <button
            disabled={num.length !== 10}
            onClick={() => { setPhone("+91" + num); nav({ to: "/otp" }); }}
            className="mt-4 w-full gold-gradient text-primary-foreground rounded-2xl py-4 font-semibold shadow-[var(--shadow-glow)] disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            <Phone className="size-4" /> Continue with +91 {num || "•••• ••••"}
          </button>

          <button
            onClick={() => { setAuthed(true); nav({ to: "/home" }); }}
            className="mt-3 w-full text-center text-sm uppercase tracking-wider text-primary font-semibold py-2 underline"
          >
            Continue as guest
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          By continuing you agree to our<br />
          <Link to="/" className="text-primary underline">Terms</Link> & <Link to="/" className="text-primary underline">Privacy policy</Link>
        </p>
      </div>
    </div>
  );
}
