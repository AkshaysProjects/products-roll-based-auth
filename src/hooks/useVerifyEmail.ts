import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const verifyEmail = (token: string) => {
  return api
    .post("/api/auth/verify", { token })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export default function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}
