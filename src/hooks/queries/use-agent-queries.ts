import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Agent } from "@/types";

interface AgentSearchParams {
  search?: string;
  email?: string;
  persona?: string;
  voip_no?: string;
  dept?: string;
  status?: string;
}

export const useAgentsQuery = (params?: AgentSearchParams) => {
  return useQuery({
    queryKey: ["agents", params],
    queryFn: async () => {
      const response = await api.get<{ data: Agent[] }>("/agents", {
        params,
      });
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
