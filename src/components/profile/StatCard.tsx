interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex items-center space-x-3 bg-background rounded-md p-3">
      {icon}
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
