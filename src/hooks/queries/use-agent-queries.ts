import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Agent } from "@/types";

export const useAgentsQuery = () => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const response = await api.get<{ data: Agent[] }>("/agents");
      return response.data.data;
    },
  });
};

export const useAgentQuery = (id: string) => {
  return useQuery({
    queryKey: ["agents", id],
    queryFn: async () => {
      const response = await api.get<{ data: Agent }>(`/agents/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}; 