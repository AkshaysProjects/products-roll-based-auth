import { UserRole } from "@/enums/user_role";
import { User } from "@/types/user";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchUserDetails = async (): Promise<User | null> => {
  return api
    .get<User>("/api/user")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return null;
    });
};

// Custom hook to manage authentication and authorization
export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const query = useQuery({
    queryKey: ["auth"],
    queryFn: fetchUserDetails,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setIsAuthenticated(true);
      setIsAdmin(query.data.role === UserRole.ADMIN);
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, [query.data]);

  return {
    ...query,
    isAuthenticated,
    isAdmin,
  };
}
