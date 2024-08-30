import { UserRole } from "@/enums/user_role";
import { User } from "@/types/user";
import api from "@/utils/api";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean | null;
  isAdmin: boolean;
  user: User | null;
  isLoading: boolean;
  fetchUserDetails: () => Promise<void>;
}

const useAuth = create<AuthState>((set) => ({
  isAuthenticated: null,
  isAdmin: false,
  user: null,
  isLoading: true,

  fetchUserDetails: async () => {
    try {
      const response = await api.get<User>("/api/user");
      const user = response.data;

      set({
        isAuthenticated: true,
        isAdmin: user.role === UserRole.ADMIN,
        isLoading: false,
        user,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
        user: null,
      });
    }
  },
}));

export default useAuth;
