import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

export function NotificationSettings() {
  return (
    <Card className="border-0">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h3 className="text-lg font-medium">Notification Preferences</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Configure how you want to receive notifications
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Missed Calls</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about missed calls
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Campaign Updates</Label>
              <p className="text-sm text-muted-foreground">
                Notifications for campaign status changes
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Performance Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get alerts for significant performance changes
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </Card>
  );
} 