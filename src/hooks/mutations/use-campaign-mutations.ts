import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
 

interface Campaign {
  name: string;
  description: string;
  leads: string[];
  agents_ids: string[];
  status: string;
  knowledge_base: string;
  documents_index: string;
}

export function useCreateCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Campaign) => api.post("/campaigns", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    }
  });
}

export function useUpdateCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Campaign }) => 
      api.patch(`/campaigns/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    }
  });
}

export function useDeleteCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/campaigns/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    }
  });
}
