import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface PermissionsResponse {
  success: boolean;
  data: string[];
}

export function usePermissionsQuery() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const response = await api.get<PermissionsResponse>("/permissions");
      return response.data;
    },
  });
}

