import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, ShoppingBag, User, MapPin } from "lucide-react";
import { useCart, cartTotals } from "@/lib/cart-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const items = useCart((s) => s.items);
  const { count } = cartTotals(items);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const tabs: Array<{ to: "/home" | "/categories" | "/cart" | "/profile"; icon: typeof Home; label: string; badge?: number }> = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/categories", icon: LayoutGrid, label: "Browse" },
    { to: "/cart", icon: ShoppingBag, label: "Cart", badge: count },
    { to: "/profile", icon: User, label: "Me" },
  ];

  return (
    <div className="min-h-dvh bg-background text-foreground flex justify-center">
      <div className="w-full max-w-[440px] min-h-dvh relative pb-24 border-x border-border/40">
        {/* top status strip */}
        <div className="sticky top-0 z-30 backdrop-blur bg-background/80 border-b border-border/40">
          <div className="flex items-center justify-between px-5 py-3">
            <Link to="/home" className="flex items-center gap-2">
              <div className="size-8 rounded-xl gold-gradient grid place-items-center text-primary-foreground font-bold">Y</div>
              <span className="font-bold tracking-tight">YallO</span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-primary" />
              <span className="uppercase tracking-wider">Bengaluru · HSR</span>
            </div>
          </div>
        </div>

        {children}

        {/* bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40">
          <div className="mx-3 mb-3 rounded-2xl bg-card/95 backdrop-blur border border-border shadow-[var(--shadow-card)] grid grid-cols-4">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = path === t.to || (t.to === "/home" && path === "/home");
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`flex flex-col items-center gap-1 py-3 text-[11px] uppercase tracking-wider transition-colors ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
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
