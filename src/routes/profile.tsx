import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Heart, MapPin, CreditCard, Bell, HelpCircle, LogOut, Star } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — YallO" }] }),
  component: ProfilePage,
});

const rows = [
  { icon: Heart, label: "Favorites" },
  { icon: MapPin, label: "Saved addresses" },
  { icon: CreditCard, label: "Payment methods" },
  { icon: Bell, label: "Notifications" },
  { icon: HelpCircle, label: "Help & support" },
];

function ProfilePage() {
  return (
    <AppShell>
      <main className="px-5 pt-4 pb-4">
        <div className="rounded-3xl p-5 border border-primary/30 relative overflow-hidden"
             style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 14%, var(--card)), var(--card))" }}>
          <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="size-14 rounded-full gold-gradient grid place-items-center text-primary-foreground font-bold text-lg">AS</div>
            <div>
              <p className="font-semibold">Aarav Sharma</p>
              <p className="text-xs text-muted-foreground">+91 98•••• ••42</p>
              <div className="mt-2 inline-flex items-center gap-1.5 surface-gold rounded-full px-2.5 py-0.5">
                <Star className="size-3 fill-primary text-primary" />
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Gold member</span>
              </div>
            </div>
          </div>
        </div>

        <Link to="/booking/$bookingId" params={{ bookingId: "YALLO#A1B2C3D4" }}
              className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="size-10 rounded-xl surface-gold grid place-items-center text-primary">📋</div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Active booking</p>
            <p className="text-xs text-muted-foreground">Deep cleaning · arriving in 12 min</p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>

        <div className="mt-4 rounded-2xl border border-border bg-card divide-y divide-border">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <button key={r.label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
                <Icon className="size-4 text-primary" />
                <span className="flex-1 text-sm font-medium">{r.label}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        <button className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-border py-3.5 text-sm text-muted-foreground">
          <LogOut className="size-4" /> Sign out
        </button>
      </main>
    </AppShell>
  );
}
