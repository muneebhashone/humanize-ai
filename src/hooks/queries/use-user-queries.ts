import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface User {
  _id: string;
  email: string;
  username: string;
  name: string;
  otp: string | null;
  role: string;
  permissions: string[];
  socialAccount: [];
  createdAt: string;
  updatedAt: string;
}

interface PaginatorInfo {
  skip: number;
  limit: number;
  currentPage: number;
  pages: number;
  hasNextPage: boolean;
  totalRecords: number;
  pageSize: number;
}

interface UsersResponse {
  success: boolean;
  data: {
    results: User[];
    paginatorInfo: PaginatorInfo;
  };
}

interface UsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useUsersQuery = (params?: UsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const { data } = await api.get<UsersResponse>("/users", {
        params,
      });
      return data;
    },
  });
};
