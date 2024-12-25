import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface SocialAccount {
  provider: string;
  id: string;
}

interface User {
  _id: string;
  email: string;
  username: string;
  name: string;
  role: string;
  socialAccount: SocialAccount[];
  createdAt: string;
  updatedAt: string;
  sub: string;
}

interface UserResponse {
  success: boolean;
  data: User;
}

export const queryKeys = {
  auth: {
    user: ["auth", "user"] as const,
  },
};

/**
 * Hook to fetch authenticated user data from the API
 * Returns the full query object with data, loading and error states
 */
export const useAuthQuery = () => {
  return useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const { data } = await axios.get<UserResponse>("/auth/user");
      return data.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Simple hook that returns just the user data
 * Useful when you only need the user object
 */
export const useUser = () => {
  const { data: user } = useAuthQuery();
  return user;
};

/**
 * Hook to check authentication status
 * Returns isAuthenticated flag, loading state and user data
 * Useful for protecting routes and showing auth-dependent UI
 */
export const useIsAuthenticated = () => {
  const { data: user, isLoading } = useAuthQuery();
  return {
    isAuthenticated: Boolean(user),
    isLoading,
    user,
  };
}; 