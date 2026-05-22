import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Plus, Minus, Star, ShoppingBag } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { categoryById, servicesByCategory, inr } from "@/lib/yallo-data";
import { useCart, cartTotals } from "@/lib/cart-store";

export const Route = createFileRoute("/services/$categoryId")({
  loader: ({ params }) => {
    const category = categoryById(params.categoryId);
    if (!category) throw notFound();
    return { category, services: servicesByCategory(params.categoryId) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.name ?? "Services"} — YallO` },
      { name: "description", content: loaderData?.category.tagline ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <AppShell>
      <div className="p-8 text-center text-muted-foreground">Category not found.</div>
    </AppShell>
  ),
  errorComponent: () => (
    <AppShell>
      <div className="p-8 text-center text-destructive">Failed to load services.</div>
    </AppShell>
  ),
  component: ServicesPage,
});

function ServicesPage() {
  const { category, services } = Route.useLoaderData();
  const items = useCart((s) => s.items);
  const add = useCart((s) => s.add);
  const setQty = useCart((s) => s.setQty);
  const { count, total } = cartTotals(items);
  const qtyOf = (id: string) => items.find((i) => i.serviceId === id)?.qty ?? 0;

  return (
    <AppShell>
      <main className="px-5 pt-2 pb-4">
        <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground py-2">
          <ArrowLeft className="size-4" /> Back
        </Link>

        <div className="mt-2 rounded-3xl p-5 border border-border bg-card relative overflow-hidden">
          <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-card-elevated grid place-items-center text-3xl">{category.emoji}</div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">{category.eta} min ETA</p>
              <h1 className="text-xl font-bold mt-0.5">{category.name}</h1>
              <p className="text-xs text-muted-foreground">{category.tagline}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {services.map((s) => {
            const q = qtyOf(s.id);
            return (
              <div key={s.id} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                    <div className="flex items-center gap-3 mt-2.5 text-xs">
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3 fill-primary text-primary" />
                        <span className="font-mono">{s.rating}</span>
                        <span className="text-muted-foreground">({s.reviews.toLocaleString("en-IN")})</span>
                      </span>
                      <span className="text-muted-foreground font-mono">{s.duration} min</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="font-mono font-semibold text-primary">{inr(s.price)}</div>
                    {q === 0 ? (
                      <button
                        onClick={() => add(s.id)}
                        className="surface-gold text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-card-elevated px-1 py-1">
                        <button onClick={() => setQty(s.id, q - 1)} className="size-7 grid place-items-center text-primary">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="font-mono font-semibold w-4 text-center">{q}</span>
                        <button onClick={() => setQty(s.id, q + 1)} className="size-7 grid place-items-center text-primary">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* sticky cart bar */}
        {count > 0 && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-3 z-30">
            <Link
              to="/cart"
              className="flex items-center justify-between gold-gradient text-primary-foreground rounded-2xl px-5 py-3.5 shadow-[var(--shadow-glow)]"
            >
              <span className="flex items-center gap-2 font-semibold">
                <ShoppingBag className="size-4" />
                {count} item{count > 1 ? "s" : ""} · <span className="font-mono">{inr(total)}</span>
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider">Review →</span>
            </Link>
          </div>
        )}
      </main>
    </AppShell>
  );
}
