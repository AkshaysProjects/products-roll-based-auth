import { PendingChange } from "@/types/change";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const getPendingRequests = async () => {
  return api.get<PendingChange[]>("/api/changes").then((res) => res.data);
};

export default function usePendingRequests() {
  return useQuery({
    queryKey: ["pending-requests"],
    queryFn: getPendingRequests,
  });
}
