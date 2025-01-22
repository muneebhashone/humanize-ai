import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface CallLog {
  _id: string;
  type: "inbound" | "outbound";
  agent_id: string;
  campaign_id: string;
  customer_name: string;
  customer_phone_no: string;
  timestamp_start: string;
  timestamp_end?: string;
  status: "complete" | "failed" | "in_progress";
  performance_points: [];
  transcripts: [];
  createdAt: string;
  updatedAt: string;
}

interface CallLogsResponse {
  success: boolean;
  data: CallLog[];
}

interface CallLogsParams {
  search?: string;
  status?: string;
  timestamp_start?: string;
  timestamp_end?: string;
  type?: string;
}

export const useCallLogsQuery = (params?: CallLogsParams) => {
  return useQuery({
    queryKey: ["call-logs", params],
    queryFn: async () => {
      const { data } = await api.get<CallLogsResponse>("/call-logs", {
        params,
      });
      return data;
    },
  });
};
