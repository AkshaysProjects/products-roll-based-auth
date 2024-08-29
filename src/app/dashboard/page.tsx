import Dashboard from "@/components/dashboard/Dashboard";
import Guard from "@/components/guards/Guard";

export default function DashboardPage() {
  return (
    <Guard>
      <Dashboard />
    </Guard>
  );
}
