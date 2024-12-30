import axios from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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


const authService =  async ( ) => {
  const { data } = await axios.get<UserResponse>("/auth/user");
  return data;
}

/**
 * Hook to fetch authenticated user data from the API
 * Returns the full query object with data, loading and error states
 */
export const useUserQuery = (options?: Omit<UseQueryOptions<UserResponse, Error, UserResponse>, 'queryKey'> & { queryKey?: UseQueryOptions<UserResponse, Error, UserResponse>['queryKey'] }) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authService,
    ...(options || {})
  });
};
