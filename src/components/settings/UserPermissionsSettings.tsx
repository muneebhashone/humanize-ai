"use client";

import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useUserQuery } from "@/hooks/queries/use-auth-query";
import { Skeleton } from "@/components/ui/skeleton";
import { usePermissionsQuery } from "@/hooks/queries/use-permissions-query";
import { useUpdateUserPermissionsMutation } from "@/hooks/mutations/use-permissions-mutations";

export function UserPermissionsSettings() {
  const { data: permissions, isLoading: isLoadingPermissions } =
    usePermissionsQuery();
  const { data: userData } = useUserQuery();
  const userId = userData?.data?._id;
  const userPermissions = userData?.data?.permissions || [];

  const { mutate: updatePermissions } = useUpdateUserPermissionsMutation();

  const handlePermissionChange = (permission: string, isChecked: boolean) => {
    if (!userId) return;

    // Get current permissions and update them
    const updatedPermissions = isChecked
      ? [...userPermissions, permission]
      : userPermissions.filter((p: string) => p !== permission);

    updatePermissions({
      id: userId,
      permissions: updatedPermissions,
    });
  };

  return (
    <Card className="border-0">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <h3 className="text-lg font-medium">User Permissions</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your account permissions and access levels
        </p>

        <div className="mt-6">
          {isLoadingPermissions ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {permissions?.data.map((permission: string) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={userPermissions.includes(permission)}
                    onCheckedChange={(checked) =>
                      handlePermissionChange(permission, checked as boolean)
                    }
                  />
                  <Label htmlFor={permission} className="text-sm">
                    {permission.split("_").join(" ").toLowerCase()}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
