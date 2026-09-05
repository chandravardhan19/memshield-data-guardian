import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ActionBadge,
  GlassCard,
  PageHeader,
  PrivacyBadge,
} from "@/components/memshield/primitives";
import { Button } from "@/components/ui/button";
import { destinations, policyRules } from "@/lib/memshield/mock-data";
import { analyze } from "@/lib/memshield/engine";
import { useDemoInput } from "@/lib/memshield/store";
import { BrainCircuit, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/_shell/policy")({
  head: () => ({
    meta: [
      { title: "Policy Engine — MemShield" },
      {
        name: "description",
        content:
          "MemShield evaluates data sensitivity and destination before selecting a protection method for each detected entity.",
      },
      { property: "og:title", content: "Policy Engine — MemShield" },
      {
        property: "og:description",
        content: "How MemShield decides between masking, tokenizing, anonymizing and blocking.",
      },
    ],
  }),
  component: PolicyEngine,
});

function PolicyEngine() {
  const input = useDemoInput();
  const detections = analyze(input);
  const dest = destinations.find((d) => d.id === input.destination)!;
  const headline = detections.find((d) => d.key === "account") ?? detections[0];

  return (
    <>
      <PageHeader
        title="Policy Engine"
        subtitle="MemShield evaluates data sensitivity and destination before selecting a protection method."
        actions={
          <Button asChild variant="hero">
            <Link to="/output">View Protected Output</Link>
          </Button>
        }
      />

      <GlassCard className="p-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Data Type", value: headline?.dataType ?? "—" },
              { label: "Privacy Level", value: headline?.level ?? "—" },
              { label: "Destination", value: `${dest.icon} ${dest.name}` },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-border bg-surface-2/60 p-4 text-center"
              >
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {c.label}
                </p>
                <p className="mt-2 text-sm font-semibold">{c.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-primary lg:rotate-[-90deg]">↓</span>
            <div className="glow grid size-24 place-items-center rounded-full border border-primary/40 bg-primary/10 text-center">
              <BrainCircuit className="size-7 text-primary" />
            </div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
              Policy Engine
            </p>
            <span className="text-primary lg:rotate-[-90deg]">↓</span>
          </div>

          <div className="rounded-2xl border border-primary/35 bg-primary/8 p-5 text-center">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Protection Action
            </p>
            <p className="mt-3 font-display text-2xl font-semibold text-primary">
              {headline?.action ?? "—"}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Applied to {headline?.dataType.toLowerCase() ?? "data"} before routing.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold">Policy Rules</h2>
          <p className="text-sm text-muted-foreground">
            Deterministic rules mapping data type + privacy level + destination to an action.
          </p>
          <div className="mt-5 -mx-2 overflow-x-auto px-2">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  <th className="py-3 pr-3">Data Type</th>
                  <th className="py-3 pr-3">Privacy Level</th>
                  <th className="py-3 pr-3">Destination</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {policyRules.map((r, i) => (
                  <tr
                    key={`${r.dataType}-${r.destination}-${i}`}
                    className="border-b border-border/60 transition-colors last:border-0 hover:bg-surface-2/60"
                  >
                    <td className="py-3 pr-3 font-medium">{r.dataType}</td>
                    <td className="py-3 pr-3">
                      <PrivacyBadge level={r.level} withLabel={false} />
                    </td>
                    <td className="py-3 pr-3 text-muted-foreground">{r.destination}</td>
                    <td className="py-3">
                      <ActionBadge action={r.action} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Lightbulb className="size-4 text-warning" /> Why this action?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{headline?.reason}</p>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold">Current Decisions</h2>
            <ul className="mt-4 space-y-3">
              {detections.map((d) => (
                <li
                  key={d.key}
                  className="flex items-center justify-between gap-2 rounded-xl border border-border bg-surface-2/60 px-3 py-2.5"
                >
                  <span className="min-w-0 truncate text-sm">{d.dataType}</span>
                  <ActionBadge action={d.action} />
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
