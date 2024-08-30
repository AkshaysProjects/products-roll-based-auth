import useAuth from "@/hooks/useAuth";
import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const login = (token: string) => {
  return api
    .post("/api/auth/login", { token })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export default function useLogin() {
  const { fetchUserDetails } = useAuth();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      fetchUserDetails();
    },
    onSettled: () => {
      fetchUserDetails();
    },
  });
}
