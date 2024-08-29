import Guard from "@/components/guards/Guard";
import PendingRequests from "@/components/requests/PendingRequests";

export default function PendingRequestsPage() {
  return (
    <Guard admin>
      <PendingRequests />
    </Guard>
  );
}
