import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { GlassCard, PageHeader, VerticalFlow } from "@/components/memshield/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { destinations, type DestinationId } from "@/lib/memshield/mock-data";
import { setDemoInput } from "@/lib/memshield/store";
import { useDemoInput } from "@/lib/memshield/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/protect")({
  head: () => ({
    meta: [
      { title: "Protect Sensitive Data — MemShield Demo" },
      {
        name: "description",
        content:
          "Enter demo data and simulate how MemShield detects, classifies and protects information before routing it.",
      },
      { property: "og:title", content: "Protect Sensitive Data — MemShield Demo" },
      {
        property: "og:description",
        content: "Simulate the MemShield protection pipeline with demo data.",
      },
    ],
  }),
  component: ProtectData,
});

function ProtectData() {
  const input = useDemoInput();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => navigate({ to: "/detection" }), 1400);
  };

  const field = (
    id: keyof typeof input,
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={String(input[id])}
        placeholder={placeholder}
        onChange={(e) => setDemoInput({ [id]: e.target.value })}
        className="h-11 bg-surface-2/60"
      />
    </div>
  );

  return (
    <>
      <PageHeader
        title="Protect Sensitive Data"
        subtitle="Enter demo data and simulate how MemShield protects information before routing it."
      />

      <div className="flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
        <p className="text-sm text-warning">
          Use demo data only. Do not enter real passwords, OTPs, PINs, CVVs, or banking credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold">Demo Input</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {field("fullName", "Full Name", "Demo User")}
              {field("email", "Email Address", "demo@example.com")}
              {field("phone", "Phone Number", "9876543210")}
              {field("account", "Account Number", "1234567890")}
              <div className="sm:col-span-2">{field("amount", "Transaction Amount (₹)", "10000")}</div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message">Free Text Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={input.message}
                  onChange={(e) => setDemoInput({ message: e.target.value })}
                  className="bg-surface-2/60"
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold">Destination</h2>
            <p className="text-sm text-muted-foreground">
              The same data receives a different protection per destination.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {destinations.map((d) => {
                const selected = input.destination === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDemoInput({ destination: d.id as DestinationId })}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition-all duration-300",
                      selected
                        ? "border-primary/60 bg-primary/10 glow"
                        : "border-border bg-surface-2/50 hover:border-primary/35",
                    )}
                  >
                    <span className="text-2xl">{d.icon}</span>
                    <p className="mt-3 font-semibold">{d.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{d.description}</p>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-4">
          <GlassCard className="p-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Privacy process preview
            </p>
            <div className="mt-5">
              <VerticalFlow
                items={["Input Data", "Detect", "Classify", "Policy Engine", "Protect", "Route"]}
              />
            </div>
          </GlassCard>

          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={processing}>
            <ShieldCheck className={processing ? "animate-spin" : ""} />
            {processing ? "Processing…" : "Protect & Process"}
          </Button>

          {processing ? (
            <GlassCard className="space-y-2 p-4">
              {["Intercepting payload", "Detecting entities", "Applying policy"].map((s, i) => (
                <p
                  key={s}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                  style={{ animation: `fade-in 0.4s ease ${i * 0.35}s both` }}
                >
                  <span className="size-1.5 rounded-full bg-primary" /> {s}
                </p>
              ))}
            </GlassCard>
          ) : null}
        </div>
      </form>
    </>
  );
}
