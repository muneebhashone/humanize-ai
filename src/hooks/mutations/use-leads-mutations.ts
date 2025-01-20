import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

interface Lead {
  name: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  address: string;
  dob: string;
}

export function useCreateLeadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Lead) => api.post("/leads", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}

export function useUpdateLeadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Lead> }) => 
      api.patch(`/leads/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}

export function useDeleteLeadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
}
