import { PendingChange } from "@/types/change";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const getPendingRequest = async (requestId: string) => {
  return api
    .get<PendingChange>(`/api/changes/${requestId}`)
    .then((res) => res.data);
};

export default function usePendingRequest(requestId: string) {
  return useQuery({
    queryKey: ["pending-requests", requestId],
    queryFn: () => getPendingRequest(requestId),
  });
}
