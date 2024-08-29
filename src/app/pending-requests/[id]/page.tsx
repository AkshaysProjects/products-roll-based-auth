import Guard from "@/components/guards/Guard";
import ReviewRequest from "@/components/requests/ReviewRequest";

export default function ReviewRequestPage() {
  return (
    <Guard admin>
      <ReviewRequest />
    </Guard>
  );
}
