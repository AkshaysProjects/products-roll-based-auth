import { UserRole } from "@/enums/user_role";
import { User } from "@/types/user";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Custom hook to manage authentication and authorization
export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserDetails = async (): Promise<User | null> => {
    return api
      .get<User>("/api/user")
      .then((res) => {
        setIsAuthenticated(true);
        setIsAdmin(res.data.role === UserRole.ADMIN);
        return res.data;
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        return null;
      });
  };

  const query = useQuery({
    queryKey: ["auth"],
    queryFn: fetchUserDetails,
    retry: false,
  });

  return {
    ...query,
    isAuthenticated,
    isAdmin,
  };
}
