import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Boxes,
  ClipboardList,
  Home,
  Lock,
  Menu,
  ScanSearch,
  Settings,
  Shield,
  ShieldCheck,
  BrainCircuit,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/protect", label: "Protect Data", icon: ShieldCheck },
  { to: "/detection", label: "Detection Results", icon: ScanSearch },
  { to: "/policy", label: "Policy Engine", icon: BrainCircuit },
  { to: "/output", label: "Protected Output", icon: Lock },
  { to: "/audit", label: "Audit Logs", icon: ClipboardList },
  { to: "/architecture", label: "Architecture", icon: Boxes },
] as const;

function NavList({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {nav.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          activeProps={{
            className: "bg-primary/12 text-primary border border-primary/25",
          }}
        >
          <Icon className="size-4 shrink-0" />
          <span className="truncate">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" className="flex items-center gap-2.5 px-1" onClick={onNavigate}>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground">
          <Shield className="size-4.5" strokeWidth={2.4} />
        </span>
        <span className="font-display text-base font-semibold">
          Mem<span className="text-gradient">Shield</span>
        </span>
      </Link>

      <NavList onNavigate={onNavigate} />

      <div className="space-y-1 border-t border-sidebar-border pt-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
          <Settings className="size-4" />
          Settings
        </button>
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent px-3 py-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand font-mono text-xs text-primary-foreground">
            DU
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Demo User</p>
            <p className="truncate text-[11px] text-muted-foreground">Security Analyst</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
      <SidebarInner />
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="glass"
        size="icon"
        aria-label="Open navigation"
        className="min-h-11 min-w-11 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 border-r border-sidebar-border bg-sidebar">
            <div className="flex justify-end p-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
                className="min-h-11 min-w-11"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>
            <SidebarInner onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
