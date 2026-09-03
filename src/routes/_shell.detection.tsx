import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GlassCard,
  PageHeader,
  PrivacyBadge,
  ProcessingStep,
} from "@/components/memshield/primitives";
import { Button } from "@/components/ui/button";
import { privacyLevels, type PrivacyLevel } from "@/lib/memshield/mock-data";
import { analyze } from "@/lib/memshield/engine";
import { useDemoInput } from "@/lib/memshield/store";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_shell/detection")({
  head: () => ({
    meta: [
      { title: "Sensitive Data Detection — MemShield" },
      {
        name: "description",
        content:
          "See every sensitive entity MemShield detected in the submitted demo payload with its assigned privacy level.",
      },
      { property: "og:title", content: "Sensitive Data Detection — MemShield" },
      {
        property: "og:description",
        content: "MemShield has analyzed the submitted information.",
      },
    ],
  }),
  component: DetectionResults,
});

function DetectionResults() {
  const input = useDemoInput();
  const detections = analyze(input);

  return (
    <>
      <PageHeader
        title="Sensitive Data Detection"
        subtitle="MemShield has analyzed the submitted information."
        actions={
          <Button asChild variant="hero">
            <Link to="/policy">Continue to Policy Engine</Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {detections.map((d) => (
            <GlassCard
              key={d.key}
              className="p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-success">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span className="truncate uppercase">{d.dataType} detected</span>
                </span>
                <span className="shrink-0 text-lg">{d.icon}</span>
              </div>
              <p className="mt-3 truncate font-mono text-lg">{d.value}</p>
              <dl className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="text-right">{d.category}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Privacy Level</dt>
                  <dd>
                    <PrivacyBadge level={d.level} />
                  </dd>
                </div>
              </dl>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-4">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold">Privacy Level Legend</h2>
            <ul className="mt-4 space-y-3">
              {(Object.keys(privacyLevels) as PrivacyLevel[]).map((lvl) => (
                <li key={lvl} className="flex items-center justify-between gap-3">
                  <PrivacyBadge level={lvl} withLabel={false} />
                  <span className="text-xs text-muted-foreground">
                    {privacyLevels[lvl].description}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold">Processing Timeline</h2>
            <div className="mt-5">
              <ProcessingStep title="Data Received" description="Payload intercepted" />
              <ProcessingStep
                title="Sensitive Data Detected"
                description={`${detections.length} entities found`}
              />
              <ProcessingStep title="Privacy Level Assigned" description="PL1 – PL4 classified" />
              <ProcessingStep
                title="Sending to Policy Engine"
                description="Evaluating destination rules"
                state="active"
                icon="→"
              />
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
