import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, PageHeader } from "@/components/memshield/primitives";
import { architectureComponents } from "@/lib/memshield/mock-data";

export const Route = createFileRoute("/_shell/architecture")({
  head: () => ({
    meta: [
      { title: "MemShield Architecture — Privacy Middleware Design" },
      {
        name: "description",
        content:
          "Explore the MemShield engine: data interceptor, detector, privacy classifier, policy engine, protection engine and destination router.",
      },
      { property: "og:title", content: "MemShield Architecture" },
      {
        property: "og:description",
        content: "Inside the MemShield privacy-aware protection engine.",
      },
    ],
  }),
  component: Architecture,
});

function Node({
  icon,
  label,
  className,
}: {
  icon: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-border bg-surface-2/70 px-5 py-3 text-center text-sm font-medium " +
        (className ?? "")
      }
    >
      <span className="mr-2">{icon}</span>
      {label}
    </div>
  );
}

function Arrow() {
  return <span className="text-primary">↓</span>;
}


function Architecture() {
  return (
    <>
      <PageHeader
        title="MemShield Architecture"
        subtitle="Every request flows through a deterministic privacy pipeline before it reaches a destination."
      />

      <GlassCard className="bg-hero relative overflow-hidden p-6 sm:p-10">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-3">
          <Node icon="👤" label="User" />
          <Arrow />
          <Node icon="📱" label="Web Application" />
          <Arrow />

          <div className="glow w-full rounded-3xl border border-primary/40 bg-surface/70 p-5">
            <p className="text-center font-display text-base font-semibold text-primary">
              🛡️ MemShield Engine
            </p>
            <div className="mt-5 flex flex-col items-center gap-2">
              {[
                "1. Data Interceptor 📥",
                "2. Data Detector 🔍",
                "3. Privacy Classifier 🏷️",
                "4. Policy Engine 🧠",
                "5. Protection Engine 🔐",
              ].map((label, i, arr) => (
                <div key={label} className="flex w-full flex-col items-center gap-2">
                  <div className="w-full rounded-xl border border-primary/25 bg-primary/8 px-4 py-2.5 text-center font-mono text-xs tracking-wide">
                    {label}
                  </div>
                  {i < arr.length - 1 ? <Arrow /> : null}
                </div>
              ))}
            </div>
          </div>

          <Arrow />
          <Node icon="🚦" label="Destination Router" className="border-primary/40" />
          <Arrow />
          <div className="grid w-full gap-3 sm:grid-cols-3">
            <Node icon="🏦" label="Bank" />
            <Node icon="🤖" label="AI" />
            <Node icon="📊" label="Analytics" />
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {architectureComponents.map((c) => (
          <GlassCard
            key={c.title}
            className="p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{c.icon}</span>
              <span className="font-mono text-xs text-muted-foreground">{c.step}</span>
            </div>
            <h2 className="mt-4 text-base font-semibold">{c.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
