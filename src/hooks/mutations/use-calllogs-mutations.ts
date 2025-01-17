import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

interface Transcript {
  role: string;
  content: string;
}

interface CallLog {
  type: "inbound" | "outbound";
  agent_id: string;
  campaign_id: string;
  customer_name: string;
  customer_phone_no: string;
  timestamp_start: string;
  timestamp_end: string;
  status: "completed" | "failed" | "missed";
  transcripts: Transcript[];
  performance_points: string[];
  recording: string;
}

export function useCreateCallLogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CallLog) => api.post("/call-logs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['call-logs'] });
    }
  });
}

export function useUpdateCallLogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CallLog> }) => 
      api.patch(`/call-logs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['call-logs'] });
    }
  });
}

export function useDeleteCallLogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/call-logs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['call-logs'] });
    }
  });
}
