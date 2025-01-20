import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Agent, CreateAgentData } from "@/types";

export const useCreateAgentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAgentData) => {
      const response = await api.post<{ data: Agent }>("/agents", data);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("Agent created successfully");
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create agent");
    },
  });
};

export const useUpdateAgentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateAgentData> }) => {
      const response = await api.patch<{ data: Agent }>(`/agents/${id}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("Agent updated successfully");
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update agent");
    },
  });
};

export const useDeleteAgentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete<{ success: boolean }>(`/agents/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Agent deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete agent");
    },
  });
};
