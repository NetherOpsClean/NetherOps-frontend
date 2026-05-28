import { Outlet } from "react-router";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import { AppSidebar } from "@/components/AppSidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      <AppSidebar />

      <div className="flex flex-col flex-1">
        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}