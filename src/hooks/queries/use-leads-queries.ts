import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  address: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadsFilters {
  search?: string;
  city?: string;
  country?: string;
}

export function useLeadsQuery(filters?: LeadsFilters) {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: async () => {
      const { data } = await api.get<{ data: Lead[] }>('/leads', {
        params: filters
      });
      return data.data;
    }
  });
}

export function useLeadQuery(id: string) {
  return useQuery({
    queryKey: ['leads', id],
    queryFn: async () => {
      const { data } = await api.get<{ data: Lead }>(`/leads/${id}`);
      return data.data;
    },
    enabled: !!id
  });
} 