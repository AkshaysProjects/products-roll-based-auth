import { Profile } from "@/types/profile";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const getProfile = async () => {
  return api.get<Profile>("/api/user").then((res) => res.data);
};

export default function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
}
