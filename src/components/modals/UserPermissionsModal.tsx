"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { usePermissionsQuery } from "@/hooks/queries/use-permissions-query";
import { useUpdateUserPermissionsMutation } from "@/hooks/mutations/use-permissions-mutations";
import { useState } from "react";

interface UserPermissionsModalProps {
  user: {
    _id: string;
    name: string;
    permissions: string[];
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UserPermissionsModal({
  user,
  open,
  onOpenChange,
  onSuccess,
}: UserPermissionsModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    user.permissions
  );
  const { data: permissions } = usePermissionsQuery();
  const { mutate: updatePermissions } = useUpdateUserPermissionsMutation();

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setSelectedPermissions((prev) =>
      checked ? [...prev, permission] : prev.filter((p) => p !== permission)
    );
  };

  const handleSave = () => {
    updatePermissions(
      {
        id: user._id,
        permissions: selectedPermissions,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User Permissions</DialogTitle>
          <DialogDescription>
            Update permissions for {user.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-2">
          {permissions?.data.map((permission) => (
            <div key={permission} className="flex items-center space-x-2">
              <Checkbox
                id={`${user._id}-${permission}`}
                checked={selectedPermissions.includes(permission)}
                onCheckedChange={(checked) =>
                  handlePermissionChange(permission, checked as boolean)
                }
              />
              <label
                htmlFor={`${user._id}-${permission}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {permission.split("_").join(" ").toLowerCase()}
              </label>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
