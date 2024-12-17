"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { CallSettings } from "@/components/settings/CallSettings";
import { SystemSettings } from "@/components/settings/SystemSettings";

export default function SettingsPage() {
  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between w-full border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <Button size="sm" className="h-9">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AccountSettings />
          <NotificationSettings />
          <CallSettings />
          <SystemSettings />
        </div>
      </div>
    </main>
  );
} 