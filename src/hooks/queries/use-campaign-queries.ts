import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface Agent {
  _id: string;
  name: string;
  email: string;
}

interface Campaign {
  _id: string;
  name: string;
  description: string;
  leads: string[];
  agents_ids: Agent[];
  status: string;
  knowledge_base: string;
  documents_index: string;
  createdAt: string;
  updatedAt: string;
}

interface CampaignsResponse {
  success: boolean;
  data: Campaign[];
}

interface CampaignFilters {
  search?: string;
  status?: string;
}

export const useCampaignsQuery = (filters?: CampaignFilters) => {
  return useQuery({
    queryKey: ["campaigns", filters],
    queryFn: async () => {
      const { data } = await api.get<CampaignsResponse>("/campaigns", {
        params: {
          search: filters?.search,
          status: filters?.status,
        },
      });
      return data.data;
    },
  });
};

export const useCampaignQuery = (id: string) => {
  return useQuery({
    queryKey: ["campaigns", id],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: Campaign }>(`/campaigns/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};
