"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { useUsersQuery } from "@/hooks/queries/use-user-queries";
import { usePermissionsQuery } from "@/hooks/queries/use-permissions-query";
import { useUserQuery } from "@/hooks/queries/use-auth-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, PencilIcon, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateUserPermissionsMutation } from "@/hooks/mutations/use-permissions-mutations";
import { toast } from "sonner";
import { UserPermissionsModal } from "@/components/modals/UserPermissionsModal";

interface User {
  _id: string;
  email: string;
  username: string;
  name: string;
  role: string;
  permissions: string[];
}

export function UserSettings() {
  const { data: usersData, isLoading, refetch } = useUsersQuery();
  const { data: permissions } = usePermissionsQuery();
  const { data: currentUser } = useUserQuery();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const { mutate: updatePermissions } = useUpdateUserPermissionsMutation();

  const isSuperUser = currentUser?.data?.role === "SUPER_ADMIN";

  const handleEditPermissions = (user: User) => {
    setSelectedUser(user);
  };

  const handleSavePermissions = () => {
    if (!selectedUser) return;

    updatePermissions(
      {
        id: selectedUser._id,
        permissions: selectedUser.permissions,
      },
      {
        onSuccess: () => {
          toast.success("Permissions updated successfully");
          setSelectedUser(null);
          refetch();
        },
        onError: (error) => {
          toast.error("Failed to update permissions: " + error.message);
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (!selectedUser) return;

    setSelectedUser((prev) => {
      if (!prev) return null;
      
      return checked
        ? { ...prev, permissions: [...prev.permissions, permission] }
        : {
            ...prev,
            permissions: prev.permissions.filter((p) => p !== permission),
          };
    });
  };

  return (
    <Card className="col-span-2 border-0">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-500/10">
            <Users className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Users</h3>
            <p className="text-sm text-muted-foreground">
              Manage user accounts and permissions
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Username
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Email
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Role
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Permissions
                </th>
                {isSuperUser && (
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr
                      key={index}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td colSpan={isSuperUser ? 6 : 5} className="p-4">
                        <Skeleton className="h-8 w-full" />
                      </td>
                    </tr>
                  ))
              ) : !usersData?.data.results.length ? (
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td
                    colSpan={isSuperUser ? 6 : 5}
                    className="p-4 text-center text-muted-foreground"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                usersData.data.results.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4">{user.username}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          user.role === "DEFAULT_USER"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                            : "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400"
                        )}
                      >
                        {user.role.replace("_", " ").toLowerCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      {selectedUser === user ? (
                        <div className="flex flex-col gap-2">
                          {permissions?.data.map((permission) => (
                            <div
                              key={permission}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`${user._id}-${permission}`}
                                checked={selectedUser?.permissions.includes(
                                  permission
                                )}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(
                                    permission,
                                    checked as boolean
                                  )
                                }
                              />
                              <label
                                htmlFor={`${user._id}-${permission}`}
                                className="text-sm"
                              >
                                {permission.split("_").join(" ").toLowerCase()}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.map((permission, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-500/20 dark:text-gray-400"
                            >
                              {permission.split("_").join(" ").toLowerCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    {isSuperUser && (
                      <td className="p-4">
                        {selectedUser === user ? (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleSavePermissions}
                              className="h-8 w-8"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleCancelEdit}
                              className="h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditPermissions(user)}
                            className="h-8 w-8"
                            disabled={user.role === "SUPER_ADMIN"}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <UserPermissionsModal
          user={selectedUser}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
          onSuccess={refetch}
        />
      )}
    </Card>
  );
}
