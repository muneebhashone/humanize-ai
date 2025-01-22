import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

import { toast } from "sonner";
import api from "@/lib/axios";

interface UpdatePermissionsRequest {
  id: string;
  permissions: string[];
}

interface UpdatePermissionsResponse {
  success: boolean;
  data: {
    permissions: string[];
  };
}

export const useUpdateUserPermissionsMutation = (
  options?: UseMutationOptions<
    UpdatePermissionsResponse,
    Error,
    UpdatePermissionsRequest
  >
): UseMutationResult<
  UpdatePermissionsResponse,
  Error,
  UpdatePermissionsRequest
> => {
  return useMutation({
    mutationFn: async ({ id, permissions }) => {
      const response = await api.patch(`/permissions/users/${id}`, {
        permissions,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Permissions updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update permissions");
    },
    ...options,
  });
};
