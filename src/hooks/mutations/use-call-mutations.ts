import api from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface StartCallRequest {
  phone: string;
  agentId: string;
  campaignId: string;
}

interface EndCallRequest {
  phone: string;
}

interface CallResponse {
  success: boolean;
  data: {
    id: string;
    phone: string;
    status: string;
    startTime?: string;
    endTime?: string;
  };
}

const startCall = async (request: StartCallRequest) => {
  const { data } = await api.post<CallResponse>("/calls/start", request);
  return data;
};

const endCall = async (request: EndCallRequest) => {
  const { data } = await api.post<CallResponse>("/calls/end", request);
  return data;
};

/**
 * Hook to start a new call
 * @param options - Optional mutation options
 */
export const useStartCallMutation = (
  options?: UseMutationOptions<CallResponse, Error, StartCallRequest>
) => {
  return useMutation({
    mutationFn: startCall,
    ...options,
  });
};

/**
 * Hook to end an ongoing call
 * @param options - Optional mutation options
 */
export const useEndCallMutation = (
  options?: UseMutationOptions<CallResponse, Error, EndCallRequest>
) => {
  return useMutation({
    mutationFn: endCall,
    ...options,
  });
};
