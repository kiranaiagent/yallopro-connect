import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, ShoppingBag, Bell, User, MapPin, ChevronDown } from "lucide-react";
import { useCart, cartTotals } from "@/lib/cart-store";
import { cityById } from "@/lib/yallo-data";

export function AppShell({ children, title }: { children: React.ReactNode; title?: string }) {
  const items = useCart((s) => s.items);
  const cityId = useCart((s) => s.cityId);
  const { count } = cartTotals(items);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const city = cityId ? cityById(cityId) : null;

  const tabs: Array<{ to: "/home" | "/bookings" | "/cart" | "/notifications" | "/profile"; icon: typeof Home; label: string; badge?: number }> = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/bookings", icon: Calendar, label: "Bookings" },
    { to: "/cart", icon: ShoppingBag, label: "Cart", badge: count },
    { to: "/notifications", icon: Bell, label: "Alerts" },
    { to: "/profile", icon: User, label: "Me" },
  ];

  return (
    <div className="min-h-dvh text-foreground flex justify-center">
      <div className="w-full max-w-[440px] min-h-dvh relative pb-24 border-x border-white/30">
        <div className="sticky top-0 z-30 glass border-b border-white/40">
          <div className="flex items-center justify-between px-5 py-3 gap-3">
            <Link to="/home" className="flex items-center gap-2 shrink-0">
              <div className="size-8 rounded-xl gold-gradient grid place-items-center text-primary-foreground font-bold shadow-[var(--shadow-glow)]">Y</div>
              <span className="font-bold tracking-tight gold-text">{title ?? "YallO"}</span>
            </Link>
            <Link to="/location" className="flex items-center gap-1.5 text-xs rounded-full surface-gold px-3 py-1.5 max-w-[60%] truncate">
              <MapPin className="size-3.5 text-primary shrink-0" />
              <span className="uppercase tracking-wider truncate font-semibold">{city?.name ?? "Choose city"}</span>
              <ChevronDown className="size-3 text-primary shrink-0" />
            </Link>
          </div>
        </div>

        {children}

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40">
          <div className="mx-3 mb-3 rounded-2xl glass-strong grid grid-cols-5">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = path === t.to;
              return (
                <Link key={t.to} to={t.to}
                  className={`flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-wider transition-colors ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}>
                  <span className="relative">
                    <Icon className="size-5" strokeWidth={active ? 2.4 : 1.8} />
                    {t.badge && t.badge > 0 ? (
                      <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full text-[10px] grid place-items-center gold-gradient text-primary-foreground font-bold">
                        {t.badge}
                      </span>
                    ) : null}
                  </span>
                  {t.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
