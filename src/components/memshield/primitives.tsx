import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { privacyLevels, type PrivacyLevel, type EventStatus } from "@/lib/memshield/mock-data";

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("glass rounded-2xl", className)}>{children}</div>;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-border pb-6 sm:flex sm:flex-wrap sm:justify-between sm:items-center">
      <div className="min-w-0 space-y-1">
        <h1 className="truncate text-2xl font-semibold sm:text-3xl">{title}</h1>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}

const plClasses: Record<PrivacyLevel, string> = {
  PL1: "border-pl1/40 bg-pl1/12 text-pl1",
  PL2: "border-pl2/40 bg-pl2/12 text-pl2",
  PL3: "border-pl3/40 bg-pl3/12 text-pl3",
  PL4: "border-pl4/40 bg-pl4/12 text-pl4",
};

export function PrivacyBadge({
  level,
  withLabel = true,
  className,
}: {
  level: PrivacyLevel;
  withLabel?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider",
        plClasses[level],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {level}
      {withLabel ? <span className="opacity-70">{privacyLevels[level].label}</span> : null}
    </span>
  );
}

const statusClasses: Record<string, string> = {
  SUCCESS: "border-success/40 bg-success/12 text-success",
  WARNING: "border-warning/40 bg-warning/12 text-warning",
  CRITICAL: "border-danger/45 bg-danger/12 text-danger",
  BLOCKED: "border-danger/45 bg-danger/12 text-danger",
  ACTIVE: "border-success/40 bg-success/12 text-success",
};

export function StatusBadge({
  status,
  className,
}: {
  status: EventStatus | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider",
        statusClasses[status] ?? "border-border bg-surface-2 text-muted-foreground",
        className,
      )}
    >
      {status}
    </span>
  );
}

export function ActionBadge({ action, className }: { action: string; className?: string }) {
  const tone =
    action === "BLOCK"
      ? "border-danger/45 bg-danger/12 text-danger"
      : action === "ALLOW"
        ? "border-warning/40 bg-warning/12 text-warning"
        : "border-primary/40 bg-primary/12 text-primary";
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-1 font-mono text-[11px] font-semibold tracking-wider",
        tone,
        className,
      )}
    >
      {action}
    </span>
  );
}

export function StatCard({
  label,
  value,
  delta,
  tone = "primary",
  icon,
}: {
  label: string;
  value: number | string;
  delta?: string;
  tone?: "primary" | "success" | "danger" | "warning";
  icon?: ReactNode;
}) {
  const toneRing: Record<string, string> = {
    primary: "from-primary/25",
    success: "from-success/25",
    danger: "from-danger/25",
    warning: "from-warning/25",
  };
  const toneText: Record<string, string> = {
    primary: "text-primary",
    success: "text-success",
    danger: "text-danger",
    warning: "text-warning",
  };
  return (
    <GlassCard className="relative overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1">
      <div
        className={cn(
          "pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-gradient-to-b to-transparent blur-2xl",
          toneRing[tone],
        )}
      />
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          {label}
        </p>
        {icon ? <span className={toneText[tone]}>{icon}</span> : null}
      </div>
      <p className={cn("mt-3 font-display text-4xl font-semibold", toneText[tone])}>{value}</p>
      {delta ? <p className="mt-1 text-xs text-muted-foreground">{delta}</p> : null}
    </GlassCard>
  );
}

export function SecurityStatusIndicator({
  name,
  status,
  uptime,
}: {
  name: string;
  status: string;
  uptime?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-2/60 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="pulse-dot size-2.5 shrink-0 rounded-full bg-success" />
        <span className="truncate text-sm font-medium">{name}</span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {uptime ? (
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">{uptime}</span>
        ) : null}
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

export function ProcessingStep({
  icon,
  title,
  description,
  state = "done",
  index,
}: {
  icon?: string;
  title: string;
  description?: string;
  state?: "done" | "active" | "pending";
  index?: number;
}) {
  const ring =
    state === "done"
      ? "border-success/50 text-success bg-success/10"
      : state === "active"
        ? "border-primary/60 text-primary bg-primary/10 pulse-dot"
        : "border-border text-muted-foreground bg-surface-2";
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-semibold",
            ring,
          )}
        >
          {icon ?? (state === "done" ? "✓" : (index ?? "•"))}
        </div>
        <div className="mt-1 w-px flex-1 bg-border last:hidden" />
      </div>
      <div className="min-w-0 pb-6">
        <p className="text-sm font-semibold">{title}</p>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

export function FlowStrip({
  steps,
  className,
}: {
  steps: { icon?: string; title: string; description?: string }[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 lg:flex-row lg:items-stretch", className)}>
      {steps.map((step, i) => (
        <div key={step.title} className="flex flex-1 items-center gap-3">
          <GlassCard className="flex-1 p-4 transition-colors duration-300 hover:border-primary/40">
            <div className="flex items-center gap-2">
              {step.icon ? <span className="text-lg">{step.icon}</span> : null}
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold">{step.title}</p>
            {step.description ? (
              <p className="text-xs text-muted-foreground">{step.description}</p>
            ) : null}
          </GlassCard>
          {i < steps.length - 1 ? (
            <>
              <div className="flow-line hidden h-px w-6 shrink-0 lg:block" />
              <div className="sr-only">then</div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function VerticalFlow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {items.map((item, i) => (
        <div key={item} className="flex w-full flex-col items-center gap-2">
          <div className="w-full rounded-xl border border-border bg-surface-2/70 px-4 py-2.5 text-center font-mono text-xs tracking-[0.14em] text-foreground uppercase">
            {item}
          </div>
          {i < items.length - 1 ? <span className="text-primary">↓</span> : null}
        </div>
      ))}
    </div>
  );
}
