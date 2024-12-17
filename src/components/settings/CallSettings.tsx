import { Card } from "@/components/ui/card";
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
import { PhoneCall } from "lucide-react";

export function CallSettings() {
  return (
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
  );
} 