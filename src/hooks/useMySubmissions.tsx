import { PendingChange } from "@/types/change";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const getMySubmissions = async () => {
  return api.get<PendingChange[]>("/api/changes/all").then((res) => res.data);
};

export default function useMySubmissions() {
  return useQuery({
    queryKey: ["my-submissions"],
    queryFn: getMySubmissions,
  });
}
