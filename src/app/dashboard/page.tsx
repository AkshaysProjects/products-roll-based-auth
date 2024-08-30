import Dashboard from "@/components/dashboard/Dashboard";
import Guard from "@/components/guards/Guard";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <Guard>
      <Dashboard />
    </Guard>
  );
}
