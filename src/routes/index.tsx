import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/memshield/Navbar";
import { FlowStrip, GlassCard, SectionTitle, VerticalFlow } from "@/components/memshield/primitives";
import { Button } from "@/components/ui/button";
import { features, pipelineSteps, privacyLevels } from "@/lib/memshield/mock-data";
import { techStack } from "@/lib/memshield/mock-data";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MemShield — Privacy-Aware Protection for Sensitive Data" },
      {
        name: "description",
        content:
          "MemShield detects sensitive data, classifies privacy risk, and applies the right protection before routing to bank, AI or analytics destinations.",
      },
      { property: "og:title", content: "MemShield — Privacy-Aware Protection for Sensitive Data" },
      {
        property: "og:description",
        content:
          "A privacy-aware security middleware concept for banking and digital payment applications.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-dvh">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
              <ShieldCheck className="size-3.5" /> Privacy-aware security middleware
            </span>
            <h1 className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
              Protect Sensitive Data{" "}
              <span className="text-gradient">Before It Reaches the Destination.</span>
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              MemShield intelligently detects sensitive information, classifies privacy risks, and
              applies the right protection based on where your data is going.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/protect">
                  Try MemShield <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/architecture">View Architecture</Link>
              </Button>
            </div>
            <dl className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {Object.entries(privacyLevels).map(([key, val]) => (
                <div key={key} className="rounded-xl border border-border bg-surface/50 p-3">
                  <dt className="font-mono text-xs text-primary">{key}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{val.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <GlassCard className="glow relative p-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Live protection pipeline
            </p>
            <div className="mt-5">
              <VerticalFlow
                items={[
                  "User Data",
                  "MemShield",
                  "Detect",
                  "Classify",
                  "Protect",
                  "Destination",
                ]}
              />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {["Bank", "AI", "Analytics"].map((d) => (
                <div
                  key={d}
                  className="rounded-xl border border-border bg-surface-2/70 px-2 py-3 text-center text-xs"
                >
                  {d}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="Capabilities"
          title="Six modules between your users and your destinations"
          subtitle="Every request passes through the same deterministic privacy pipeline."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <GlassCard
              key={f.title}
              className="p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <h3 className=" text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </GlassCard>
          ))}
          <GlassCard className="flex flex-col justify-between bg-brand/10 p-6">
            <div>
              <h3 className="text-lg font-semibold">Same data. Different destinations.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Account number → Bank = Tokenize · AI = Mask · Analytics = Anonymize
              </p>
            </div>
            <Button asChild variant="hero" className="mt-5 w-full">
              <Link to="/protect">Run the demo</Link>
            </Button>
          </GlassCard>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6">
          <SectionTitle
            eyebrow="How it works"
            title="Six steps from raw input to safe delivery"
            subtitle="MemShield never lets unprotected sensitive data reach an untrusted destination."
          />
          <FlowStrip steps={pipelineSteps} />
        </div>
      </section>

      {/* Technology stack */}
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="Technology"
          title="Built with a focused, production-style stack"
          subtitle="React, TypeScript and Tailwind CSS on the front, Python and FastAPI on the back, PostgreSQL for audit storage."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((g) => (
            <GlassCard key={g.group} className="p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
                {g.group}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {i}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-10 text-xs text-muted-foreground sm:px-6">
        <p className="font-display text-sm text-foreground">
          Mem<span className="text-gradient">Shield</span> — Privacy-Aware Protection for Sensitive
          Data
        </p>
        <p>Frontend demonstration only. All data shown is simulated mock data.</p>
      </footer>
    </div>
  );
}
