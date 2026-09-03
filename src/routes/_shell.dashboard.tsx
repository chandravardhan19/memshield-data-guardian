import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ActionBadge,
  GlassCard,
  PageHeader,
  PrivacyBadge,
  SecurityStatusIndicator,
  StatCard,
  StatusBadge,
} from "@/components/memshield/primitives";
import { Button } from "@/components/ui/button";
import {
  dashboardStats,
  privacyDistribution,
  recentActivity,
  systemStatus,
} from "@/lib/memshield/mock-data";
import { Activity, Ban, CheckCircle2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Security Overview — MemShield Dashboard" },
      {
        name: "description",
        content:
          "Monitor MemShield protection activity: requests, protected payloads, blocked events and privacy level distribution.",
      },
      { property: "og:title", content: "Security Overview — MemShield Dashboard" },
      {
        property: "og:description",
        content: "Monitor and visualize MemShield data protection activity.",
      },
    ],
  }),
  component: Dashboard,
});

const icons = [ShieldCheck, CheckCircle2, Ban, Activity];
const plColor: Record<string, string> = {
  PL1: "var(--pl1)",
  PL2: "var(--pl2)",
  PL3: "var(--pl3)",
  PL4: "var(--pl4)",
};

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Security Overview"
        subtitle="Monitor and visualize MemShield data protection activity."
        actions={
          <Button asChild variant="hero">
            <Link to="/protect">Protect Data</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((s, i) => {
          const Icon = icons[i]!;
          return <StatCard key={s.label} {...s} icon={<Icon className="size-4" />} />;
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">System Status</h2>
            <StatusBadge status="ACTIVE" />
          </div>
          <div className="mt-4 space-y-3">
            {systemStatus.map((s) => (
              <SecurityStatusIndicator key={s.name} {...s} />
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold">Privacy Level Distribution</h2>
          <p className="text-sm text-muted-foreground">Detections classified in the last 24h.</p>
          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={privacyDistribution} margin={{ left: -18, right: 8 }}>
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: "var(--surface-2)" }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--foreground)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 4, 4]}>
                  {privacyDistribution.map((d) => (
                    <Cell key={d.level} fill={plColor[d.level]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Button asChild variant="glass" size="sm">
            <Link to="/audit">View all logs</Link>
          </Button>
        </div>
        <ul className="mt-4 space-y-3">
          {recentActivity.map((e) => (
            <li
              key={e.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-surface-2/60 px-4 py-3 sm:flex sm:justify-between"
            >
              <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
                <span className="truncate font-medium">{e.dataType}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-muted-foreground">{e.destination}</span>
                <span className="text-muted-foreground">→</span>
                <ActionBadge action={e.action} />
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <PrivacyBadge level={e.level} withLabel={false} />
                <StatusBadge status={e.status} />
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>
    </>
  );
}
