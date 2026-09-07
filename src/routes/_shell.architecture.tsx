import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, PageHeader } from "@/components/memshield/primitives";
import { memshieldModules, techStack } from "@/lib/memshield/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/architecture")({
  head: () => ({
    meta: [
      { title: "MemShield Architecture — Privacy Middleware Design" },
      {
        name: "description",
        content:
          "System architecture of MemShield: React frontend, FastAPI backend, detection, classification, policy, protection, routing and PostgreSQL audit logging.",
      },
      { property: "og:title", content: "MemShield Architecture" },
      {
        property: "og:description",
        content: "Inside the MemShield privacy-aware protection engine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Architecture,
});

function Box({
  label,
  variant = "default",
  className,
}: {
  label: string;
  variant?: "default" | "accent" | "muted";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-center font-mono text-[11px] tracking-[0.14em] uppercase",
        variant === "accent"
          ? "border-primary/45 bg-primary/10 text-primary"
          : variant === "muted"
            ? "border-border bg-surface-2/40 text-muted-foreground"
            : "border-border bg-surface-2/70 text-foreground",
        className,
      )}
    >
      {label}
    </div>
  );
}

function Arrow() {
  return <span aria-hidden className="text-primary">↓</span>;
}

function Architecture() {
  return (
    <>
      <PageHeader
        title="System Architecture"
        subtitle="Every request flows through a deterministic privacy pipeline before it reaches a destination."
      />

      <GlassCard className="bg-hero relative overflow-hidden p-6 sm:p-10">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-3">
          <Box label="User" className="max-w-xs" />
          <Arrow />
          <Box label="MemShield Web App" className="max-w-xs" />
          <Arrow />
          <Box label="React + TypeScript + Tailwind CSS" className="max-w-md" variant="muted" />
          <Arrow />
          <Box label="FastAPI Backend" className="max-w-xs" />
          <Arrow />
          <Box label="Python Backend" className="max-w-xs" variant="muted" />
          <Arrow />

          <div className="w-full rounded-3xl border border-primary/40 bg-surface/70 p-5">
            <Box label="MemShield Engine" variant="accent" />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Box label="Sensitive Data Detector" />
              <Box label="Privacy Classifier" />
              <Box label="Policy Engine" />
            </div>
            <div className="mt-3 flex justify-center">
              <Arrow />
            </div>
            <Box label="Protection Engine" variant="accent" />
          </div>

          <Arrow />
          <Box label="Destination Router" variant="accent" className="max-w-sm" />
          <Arrow />
          <div className="grid w-full gap-3 sm:grid-cols-3">
            <Box label="Bank" />
            <Box label="AI" />
            <Box label="Analytics" />
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-3">
            <div className="flex justify-center">
              <Arrow />
            </div>
            <div className="flex justify-center">
              <Arrow />
            </div>
            <div className="flex justify-center">
              <Arrow />
            </div>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-3">
            <Box label="Demo Bank API" variant="muted" />
            <Box label="AI Module" variant="muted" />
            <Box label="Analytics DB" variant="muted" />
          </div>
          <Arrow />
          <Box label="PostgreSQL" className="max-w-xs" />
          <Arrow />
          <Box label="Audit Logs" variant="accent" className="max-w-xs" />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Every important action is written to the audit log.
          </p>
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {memshieldModules.map((c) => (
          <GlassCard
            key={c.title}
            className="p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            <span className="font-mono text-xs text-muted-foreground">{c.step}</span>
            <h2 className="mt-3 text-base font-semibold">{c.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold">Technology Stack</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((g) => (
            <div key={g.group} className="rounded-xl border border-border bg-surface-2/60 p-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                {g.group}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
}
