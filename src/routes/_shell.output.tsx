import { createFileRoute, Link } from "@tanstack/react-router";
import { ActionBadge, GlassCard, PageHeader } from "@/components/memshield/primitives";
import { Button } from "@/components/ui/button";
import { destinations, protectionActions } from "@/lib/memshield/mock-data";
import { analyze, protectedMessage } from "@/lib/memshield/engine";
import { useDemoInput } from "@/lib/memshield/store";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_shell/output")({
  head: () => ({
    meta: [
      { title: "Protected Data Output — MemShield" },
      {
        name: "description",
        content:
          "Compare original demo data with the MemShield-protected payload delivered to the bank, AI or analytics destination.",
      },
      { property: "og:title", content: "Protected Data Output — MemShield" },
      {
        property: "og:description",
        content: "Compare the original demo data with the protected version.",
      },
    ],
  }),
  component: ProtectedOutput,
});

function ProtectedOutput() {
  const input = useDemoInput();
  const detections = analyze(input);
  const dest = destinations.find((d) => d.id === input.destination)!;
  const usedActions = new Set(detections.map((d) => d.action));

  return (
    <>
      <PageHeader
        title="Protected Data Output"
        subtitle="Compare the original demo data with the protected version."
        actions={
          <Button asChild variant="glass">
            <Link to="/audit">Open Audit Logs</Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <GlassCard className="p-6">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            Original Data
          </p>
          <dl className="mt-4 space-y-3">
            {detections.map((d) => (
              <div
                key={d.key}
                className="rounded-xl border border-border bg-surface-2/50 px-4 py-3"
              >
                <dt className="text-xs text-muted-foreground">{d.dataType}</dt>
                <dd className="mt-1 truncate font-mono text-sm">{d.value}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>

        <div className="hidden items-center justify-center lg:flex">
          <div className="flex flex-col items-center gap-2">
            <ArrowRight className="size-5 text-primary" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              MemShield
            </span>
          </div>
        </div>

        <GlassCard className="glow border-success/25 p-6">
          <p className="font-mono text-[11px] tracking-[0.18em] text-success uppercase">
            MemShield Protected Data
          </p>
          <dl className="mt-4 space-y-3">
            {detections.map((d) => (
              <div
                key={d.key}
                className="rounded-xl border border-success/25 bg-success/8 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-xs text-muted-foreground">{d.dataType}</dt>
                  <ActionBadge action={d.action} />
                </div>
                <dd className="mt-1 truncate font-mono text-sm text-success">
                  {d.protectedValue}
                </dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold">Protection Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {protectionActions.map((a) => {
            const active = usedActions.has(a.action);
            return (
              <div
                key={a.action}
                className={cn(
                  "rounded-xl border p-4 transition-colors",
                  active
                    ? "border-primary/45 bg-primary/10"
                    : "border-border bg-surface-2/40 opacity-60",
                )}
              >
                <span className="text-xl">{a.icon}</span>
                <p className="mt-2 text-sm font-semibold">{a.label}</p>
                <p className="text-xs text-muted-foreground">{a.description}</p>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">
            {dest.icon} {dest.name.toUpperCase()} SYSTEM RECEIVES
          </h2>
          <span className="font-mono text-[11px] text-muted-foreground">
            destination = {input.destination}
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-background/70 p-5 font-mono text-sm">
          {input.destination === "ai" ? (
            <p className="break-words whitespace-pre-wrap text-primary">
              {protectedMessage(input, detections)}
            </p>
          ) : input.destination === "bank" ? (
            <div className="space-y-1 text-primary">
              <p>TOKEN_TXN_A82X9</p>
              <p className="text-muted-foreground">
                amount: ₹{Number(input.amount || 0).toLocaleString("en-IN")}
              </p>
            </div>
          ) : (
            <div className="space-y-1 text-primary">
              <p>USER_001</p>
              <p>ACCOUNT_001</p>
              <p className="text-muted-foreground">
                Transaction Amount: ₹{Number(input.amount || 0).toLocaleString("en-IN")}
              </p>
            </div>
          )}
        </div>
      </GlassCard>
    </>
  );
}
