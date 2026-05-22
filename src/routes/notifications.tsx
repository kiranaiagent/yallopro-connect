import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — YallO" }] }),
  component: NotificationsPage,
});

const list = [
  { t: "Booking placed", d: "Your associate will arrive in 30 min", time: "Now" },
  { t: "Offer unlocked", d: "Code WELCOME100 — ₹100 off first booking", time: "1h" },
  { t: "Welcome to YallO", d: "Browse services available in your city", time: "1d" },
];

function NotificationsPage() {
  return (
    <AppShell title="Alerts">
      <main className="px-5 pt-4 space-y-2.5">
        {list.map((n, i) => (
          <div key={i} className="rounded-2xl glass-strong p-4 flex gap-3">
            <span className="size-9 rounded-xl surface-gold grid place-items-center"><Bell className="size-4 text-primary" /></span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{n.t}</p>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{n.d}</p>
            </div>
          </div>
        ))}
      </main>
    </AppShell>
  );
}
