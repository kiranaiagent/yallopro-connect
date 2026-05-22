import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { categories } from "@/lib/yallo-data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All Categories — YallO" },
      { name: "description", content: "Browse every service category on YallO." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <AppShell>
      <main className="px-5 pt-4 pb-4">
        <h1 className="text-2xl font-bold">All categories</h1>
        <p className="text-sm text-muted-foreground mt-1">{categories.length} categories · pros in your city</p>

        <div className="mt-6 space-y-2.5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/services/$categoryId"
              params={{ categoryId: c.id }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 active:scale-[0.99] transition"
            >
              <div className="size-14 rounded-2xl bg-card-elevated grid place-items-center text-2xl">{c.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{c.tagline}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] uppercase tracking-wider">
                  <span className="text-success font-mono">{c.eta} min ETA</span>
                  <span className="text-muted-foreground">{c.services} services</span>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
