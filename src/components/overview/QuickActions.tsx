import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { quickActions } from "@/dummydata";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {quickActions.map((action) => (
        <Card key={action.title} className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300">
          {action.title === "New Call" ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="w-full h-full p-6">
                  <div className="flex flex-col items-center gap-4 group-hover:scale-105 transition-transform">
                    <div className={cn("p-4 rounded-full", action.bgColor)}>
                      <action.icon className={cn("h-6 w-6", action.color)} />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>New Call</DialogTitle>
                  <DialogDescription>
                    Start a new call with the selected settings.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="campaign">Campaign</Label>
                    <Select>
                      <SelectTrigger id="campaign">
                        <SelectValue placeholder="Select campaign" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales Campaign</SelectItem>
                        <SelectItem value="support">Support Campaign</SelectItem>
                        <SelectItem value="survey">Survey Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mode">Call Mode</Label>
                    <Select>
                      <SelectTrigger id="mode">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto Dialer</SelectItem>
                        <SelectItem value="predictive">Predictive Dialer</SelectItem>
                        <SelectItem value="preview">Preview Dialer</SelectItem>
                        <SelectItem value="manual">Manual Dialer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                  >
                    Start Call
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button variant="ghost" className="w-full h-full p-6">
              <div className="flex flex-col items-center gap-4 group-hover:scale-105 transition-transform">
                <div className={cn("p-4 rounded-full", action.bgColor)}>
                  <action.icon className={cn("h-6 w-6", action.color)} />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
} 