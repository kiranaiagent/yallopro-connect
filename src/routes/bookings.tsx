import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Bookings — YallO" }] }),
  component: BookingsPage,
});

function BookingsPage() {
  const ref = useCart((s) => s.bookingRef);
  return (
    <AppShell title="Bookings">
      <main className="px-5 pt-4">
        <h1 className="text-2xl font-bold">Your bookings</h1>
        {ref ? (
          <Link to="/booking/$bookingId" params={{ bookingId: ref }}
            className="mt-5 block rounded-2xl glass-strong p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Active</p>
            <p className="font-mono font-bold text-primary mt-1">{ref}</p>
            <p className="text-sm text-muted-foreground mt-1">Tap to track</p>
          </Link>
        ) : (
          <div className="mt-10 rounded-3xl glass-strong p-8 text-center">
            <Calendar className="size-10 mx-auto text-primary" />
            <p className="font-semibold mt-3">No bookings yet</p>
            <p className="text-sm text-muted-foreground mt-1">Place a booking to see it here.</p>
          </div>
        )}
      </main>
    </AppShell>
  );
}
