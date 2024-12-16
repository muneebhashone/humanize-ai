"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  Save,
  Settings2,
  Bell,

  PhoneCall,
 
} from "lucide-react";

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
          <Card className="border-0">
            <div className="p-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <h3 className="text-lg font-medium">Account Settings</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Manage your account settings and preferences
              </p>

              <div className="mt-6 space-y-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="Your name" className="pl-8" defaultValue="John Doe" />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email" placeholder="Your email" className="pl-8" defaultValue="john@example.com" />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" placeholder="Your phone" className="pl-8" defaultValue="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

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

          <Card className="border-0">
            <div className="p-6">
              <div className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5" />
                <h3 className="text-lg font-medium">Call Settings</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Configure your call handling preferences
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label>Default Call Mode</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue placeholder="Select call mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Dialer</SelectItem>
                      <SelectItem value="predictive">Predictive Dialer</SelectItem>
                      <SelectItem value="preview">Preview Dialer</SelectItem>
                      <SelectItem value="manual">Manual Dialer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Answer</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically answer incoming calls
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Call Recording</Label>
                    <p className="text-sm text-muted-foreground">
                      Record all calls automatically
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-0">
            <div className="p-6">
              <div className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                <h3 className="text-lg font-medium">System Preferences</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Configure system-wide settings
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label>Time Zone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="cst">Central Time</SelectItem>
                      <SelectItem value="mst">Mountain Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically refresh dashboard data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sound for notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
} 