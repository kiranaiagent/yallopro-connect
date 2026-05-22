import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star, Heart, Clock, BadgeCheck, CheckCircle2, XCircle, RotateCcw, ShoppingBag } from "lucide-react";
import { serviceById, categoryById, inr, cityById } from "@/lib/yallo-data";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/service/$serviceId")({
  loader: ({ params }) => {
    const s = serviceById(params.serviceId);
    if (!s) throw notFound();
    return { service: s };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.service.name ?? "Service"} — YallO` }],
  }),
  notFoundComponent: () => <div className="p-8 text-center">Service not found.</div>,
  errorComponent: () => <div className="p-8 text-center text-destructive">Failed to load.</div>,
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const add = useCart((s) => s.add);
  const items = useCart((s) => s.items);
  const cityId = useCart((s) => s.cityId);
  const city = cityId ? cityById(cityId) : null;
  const navigate = useNavigate();
  const cat = categoryById(service.categoryId);
  const inCart = items.some((i) => i.serviceId === service.id);

  return (
    <div className="min-h-dvh flex justify-center">
      <div className="w-full max-w-[440px] min-h-dvh border-x border-white/30 pb-32 relative">
        {/* sticky title */}
        <div className="sticky top-0 z-30 glass border-b border-white/40 px-4 py-3 flex items-center gap-3">
          <button onClick={() => history.back()} className="size-9 rounded-full surface-gold grid place-items-center"><ArrowLeft className="size-4 text-primary" /></button>
          <h1 className="flex-1 text-center text-sm font-bold uppercase tracking-wider truncate">{service.name}</h1>
          <span className="size-9" />
        </div>

        {/* hero image */}
        <div className="relative aspect-[4/3] bg-card-elevated">
          {service.image && <img src={service.image} alt={service.name} className="absolute inset-0 size-full object-cover" />}
          <div className="absolute top-3 right-3 flex gap-2">
            <span className="gold-gradient text-primary-foreground rounded-full px-3 py-1.5 text-xs inline-flex items-center gap-1.5 font-semibold shadow-[var(--shadow-glow)]">
              <Star className="size-3.5 fill-current" /><span className="font-mono">{service.rating}</span>
            </span>
            <button className="size-9 rounded-full glass-strong grid place-items-center"><Heart className="size-4 text-primary" /></button>
          </div>
        </div>

        <main className="px-5 -mt-4 relative">
          <div className="rounded-3xl glass-strong p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{service.sku}</p>
            <h2 className="mt-1 text-2xl font-bold leading-tight">{service.name}</h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {service.featured && (
                <span className="gold-gradient text-primary-foreground rounded-full px-3 py-1 inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]">
                  <Star className="size-3 fill-current" /> Featured
                </span>
              )}
              <span className="rounded-full surface-gold px-3 py-1 inline-flex items-center gap-1 font-semibold">
                <Clock className="size-3 text-primary" /><span className="font-mono">{service.duration} min</span>
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1 font-mono text-muted-foreground">{service.reviews} reviews</span>
            </div>

            {city && (
              <div className="mt-4 rounded-xl bg-success/15 border border-success/30 px-3 py-2.5 inline-flex items-center gap-2 text-sm">
                <BadgeCheck className="size-4 text-success" />
                <span>Available in <span className="font-semibold">{city.name}</span></span>
              </div>
            )}

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
          </div>

          <Block title="What's included">
            {service.included.map((it, i) => (
              <Row key={i} icon={<CheckCircle2 className="size-4 text-primary" />} text={it} />
            ))}
          </Block>

          <Block title="Not included" muted>
            {service.notIncluded.map((it, i) => (
              <Row key={i} icon={<XCircle className="size-4 text-destructive" />} text={it} />
            ))}
          </Block>

          <div className="mt-4 rounded-2xl glass-strong p-4 flex items-center gap-3">
            <span className="size-10 rounded-xl surface-gold grid place-items-center"><RotateCcw className="size-4 text-primary" /></span>
            <div>
              <p className="font-semibold text-sm">Re-do Guarantee</p>
              <p className="text-xs text-muted-foreground">Not satisfied? We'll come back, free.</p>
            </div>
          </div>

          {cat && <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center">Category · {cat.name}</p>}
        </main>

        {/* sticky CTA */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 glass-strong border-t border-white/40 px-4 py-3 flex items-center gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</p>
            <p className="font-mono text-xl font-bold text-primary">{inr(service.price)}</p>
          </div>
          {inCart ? (
            <Link to="/cart" className="flex-1 gold-gradient text-primary-foreground rounded-2xl py-3.5 text-center font-semibold inline-flex items-center justify-center gap-2 shadow-[var(--shadow-glow)]">
              <CheckCircle2 className="size-4" /> Added · Go to Cart
            </Link>
          ) : (
            <button onClick={() => { add(service.id); navigate({ to: "/cart" }); }}
              className="flex-1 gold-gradient text-primary-foreground rounded-2xl py-3.5 font-semibold inline-flex items-center justify-center gap-2 shadow-[var(--shadow-glow)]">
              <ShoppingBag className="size-4" /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Block({ title, children, muted }: { title: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <div className="mt-5">
      <p className={`text-[11px] uppercase tracking-[0.2em] font-bold mb-2 ${muted ? "text-muted-foreground" : "text-primary"}`}>{title}</p>
      <div className="rounded-2xl glass-strong p-4 space-y-2">{children}</div>
    </div>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="size-8 rounded-lg surface-gold grid place-items-center shrink-0">{icon}</span>
      <span className="pt-1.5">{text}</span>
    </div>
  );
}
