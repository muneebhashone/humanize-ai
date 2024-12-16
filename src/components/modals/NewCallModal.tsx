"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Users, PhoneCall } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface NewCallModalProps {
  trigger: React.ReactNode;
}

export function NewCallModal({ trigger }: NewCallModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-500/10">
              <PhoneCall className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <DialogTitle className="text-xl">New Call</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Configure and start a new outbound call
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Contact Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Phone className="h-4 w-4" />
              Contact Details
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="col-span-3"
              />
            </div>
          </div>

          {/* Campaign Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4" />
              Campaign Settings
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="campaign" className="text-sm font-medium">
                  Select Campaign
                </Label>
                <Select>
                  <SelectTrigger id="campaign" className="w-full">
                    <SelectValue placeholder="Choose a campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        Sales Campaign
                      </div>
                    </SelectItem>
                    <SelectItem value="support">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        Support Campaign
                      </div>
                    </SelectItem>
                    <SelectItem value="survey">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500" />
                        Survey Campaign
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mode" className="text-sm font-medium">
                  Dialing Mode
                </Label>
                <Select>
                  <SelectTrigger id="mode" className="w-full">
                    <SelectValue placeholder="Select dialing mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-violet-500" />
                        Auto Dialer
                      </div>
                    </SelectItem>
                    <SelectItem value="predictive">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-500" />
                        Predictive Dialer
                      </div>
                    </SelectItem>
                    <SelectItem value="preview">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-cyan-500" />
                        Preview Dialer
                      </div>
                    </SelectItem>
                    <SelectItem value="manual">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-500" />
                        Manual Dialer
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline">
            Schedule for Later
          </Button>
          <Button 
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white gap-2"
          >
            <Phone className="h-4 w-4" />
            Start Call
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 