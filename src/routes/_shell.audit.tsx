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
          "Track MemShield protection decisions with filters by destination and status. Original sensitive values are never stored.",
      },
      { property: "og:title", content: "Security Audit Logs — MemShield" },
      {
        property: "og:description",
        content: "Track MemShield protection decisions and security events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuditLogsPage,
});

const destinationFilters = ["All Destinations", "Bank", "AI", "Analytics"] as const;
const statusFilters = ["All Statuses", "SUCCESS", "BLOCKED", "FAILED"] as const;

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={cn(
            "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
            value === o
              ? "border-primary/50 bg-primary/12 text-primary"
              : "border-border bg-surface-2/50 text-muted-foreground hover:text-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function AuditLogsPage() {
  const [destination, setDestination] =
    useState<(typeof destinationFilters)[number]>("All Destinations");
  const [status, setStatus] = useState<(typeof statusFilters)[number]>("All Statuses");

  const rows = auditLogs.filter(
    (e) =>
      (destination === "All Destinations" || e.destination === destination) &&
      (status === "All Statuses" || e.status === status),
  );

  return (
    <>
      <PageHeader
        title="Audit Logs"
        subtitle="Every MemShield decision is recorded. Original sensitive values are never stored."
      />

      <div className="space-y-3">
        <FilterRow
          label="Destination"
          options={destinationFilters}
          value={destination}
          onChange={setDestination}
        />
        <FilterRow label="Status" options={statusFilters} value={status} onChange={setStatus} />
      </div>

      <GlassCard className="p-4 sm:p-6">
        <div className="-mx-2 overflow-x-auto px-2">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                <th className="py-3 pr-3">Timestamp</th>
                <th className="py-3 pr-3">Request ID</th>
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
                  <td className="py-3 pr-3 font-mono text-xs text-primary">{e.requestId}</td>
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
                  <td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                    No events match this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <p className="text-xs text-muted-foreground">
        Note: audit records store only the data type, privacy level, destination and action. No
        original sensitive value is written to the log.
      </p>
    </>
  );
}
