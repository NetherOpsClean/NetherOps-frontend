import { DashboardNavbar } from "@/components/DashboardNavbar";
import { DashboardEmptyState } from "@/components/DashboardEmptyState";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <DashboardNavbar />
      <main>
        <DashboardEmptyState />
      </main>
    </div>
  );
}