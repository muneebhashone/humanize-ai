import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";

export function AccountSettings() {
  return (
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
  );
} 