import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ActionBadge,
  GlassCard,
  PageHeader,
  PrivacyBadge,
  StatusBadge,
} from "@/components/memshield/primitives";
import { auditLogs } from "@/lib/memshield/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/audit")({
  head: () => ({
    meta: [
      { title: "Security Audit Logs — MemShield" },
      {
        name: "description",
        content:
          "Track MemShield protection decisions and security events with filters for protected, blocked and critical activity.",
      },
      { property: "og:title", content: "Security Audit Logs — MemShield" },
      {
        property: "og:description",
        content: "Track MemShield protection decisions and security events.",
      },
    ],
  }),
  component: AuditLogsPage,
});

const filters = [
  "All Events",
  "Protected",
  "Blocked",
  "Critical",
  "AI",
  "Bank",
  "Analytics",
] as const;

function AuditLogsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All Events");

  const rows = auditLogs.filter((e) => {
    switch (filter) {
      case "All Events":
        return true;
      case "Protected":
        return e.status === "SUCCESS" && e.action !== "ALLOW";
      case "Blocked":
        return e.action === "BLOCK";
      case "Critical":
        return e.status === "CRITICAL";
      default:
        return e.destination === filter;
    }
  });

  return (
    <>
      <PageHeader
        title="Security Audit Logs"
        subtitle="Track MemShield protection decisions and security events."
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
              filter === f
                ? "border-primary/50 bg-primary/12 text-primary"
                : "border-border bg-surface-2/50 text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <GlassCard className="p-4 sm:p-6">
        <div className="-mx-2 overflow-x-auto px-2">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                <th className="py-3 pr-3">Timestamp</th>
                <th className="py-3 pr-3">Data Type</th>
                <th className="py-3 pr-3">Privacy Level</th>
                <th className="py-3 pr-3">Destination</th>
                <th className="py-3 pr-3">Action Taken</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-surface-2/60"
                >
                  <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">{e.time}</td>
                  <td className="py-3 pr-3 font-medium">{e.dataType}</td>
                  <td className="py-3 pr-3">
                    <PrivacyBadge level={e.level} withLabel={false} />
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{e.destination}</td>
                  <td className="py-3 pr-3">
                    <ActionBadge action={e.action} />
                  </td>
                  <td className="py-3">
                    <StatusBadge status={e.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                    No events match this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
}
