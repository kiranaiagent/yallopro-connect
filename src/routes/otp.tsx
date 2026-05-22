import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, EyeOff, Lock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/otp")({
  head: () => ({ meta: [{ title: "Verify OTP — YallO" }] }),
  component: OtpPage,
});

function OtpPage() {
  const phone = useCart((s) => s.phone) ?? "+91 •••• ••••";
  const setAuthed = useCart((s) => s.setAuthed);
  const nav = useNavigate();
  const [digits, setDigits] = useState(["","","","","",""]);
  const [seconds, setSeconds] = useState(24);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  function set(i: number, v: string) {
    const c = v.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = c;
    setDigits(next);
    if (c && i < 5) refs.current[i + 1]?.focus();
  }

  const code = digits.join("");

  function verify() {
    if (code === "333333" || code.length === 6) {
      setAuthed(true);
      nav({ to: "/review" });
    }
  }

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

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            <ShieldCheck className="size-3.5 text-primary" /> Verify your number
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Enter the 6-digit code sent to</p>
          <p className="mt-1 font-mono font-semibold">{phone}</p>
        </div>

        <div className="mt-5 rounded-2xl surface-gold p-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Test environment</p>
          <p className="mt-1 font-mono text-3xl font-bold text-primary tracking-[0.3em]">333333</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Use this code to sign in with any phone.</p>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {digits.map((d, i) => (
            <input key={i} ref={(el) => { refs.current[i] = el; }}
              value={d} onChange={(e) => set(i, e.target.value)} inputMode="numeric" maxLength={1}
              className="size-12 rounded-xl border-2 border-primary/40 bg-card text-center font-mono text-xl font-bold text-primary outline-none focus:border-primary"
            />
          ))}
        </div>

        <button onClick={verify}
          className="mt-5 w-full gold-gradient text-primary-foreground rounded-2xl py-4 font-semibold shadow-[var(--shadow-glow)]">
          Verify OTP
        </button>
        <p className="text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-3">
          {seconds > 0 ? <>Resend OTP in <span className="font-mono">{seconds}s</span></> : <button className="text-primary underline font-semibold">Resend OTP</button>}
        </p>

        <div className="mt-6 rounded-2xl glass-strong p-4 space-y-2 text-sm">
          <Row icon={<Lock className="size-4 text-primary" />} text="End-to-end encrypted" />
          <Row icon={<EyeOff className="size-4 text-primary" />} text="We never share your number" />
          <Row icon={<ShieldCheck className="size-4 text-primary" />} text="Safe & secure sign-in" />
        </div>
      </div>
    </div>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="flex items-center gap-3"><span className="size-8 rounded-lg surface-gold grid place-items-center">{icon}</span><span>{text}</span></div>;
}
