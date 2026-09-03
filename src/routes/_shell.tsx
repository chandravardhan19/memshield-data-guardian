import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar, MobileSidebar } from "@/components/memshield/Sidebar";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl lg:hidden">
          <MobileSidebar />
          <span className="font-display text-base font-semibold">
            Mem<span className="text-gradient">Shield</span>
          </span>
        </div>
        <main className="mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
