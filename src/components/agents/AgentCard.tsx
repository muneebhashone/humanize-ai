import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PhoneCall, Clock, CheckCircle2, Coffee, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    calls_today: number;
    success_rate: string;
    avg_duration: string;
    avatar: string;
    color: string;
  };
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card key={agent.id} className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300">
      {/* Gradient Background Overlay */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r",
          agent.color,
          "md:translate-y-[100%] md:group-hover:translate-y-[0%] transition-transform duration-300",
          "opacity-100 dark:opacity-90"
        )}
      />

      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white/20 md:border-background md:group-hover:border-white/20">
              <AvatarImage src={agent.avatar} />
              <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white md:text-foreground md:group-hover:text-white">
                {agent.name}
              </h3>
              <p className="text-sm text-white/70 md:text-muted-foreground md:group-hover:text-white/70">
                {agent.role}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white md:text-muted-foreground md:group-hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Status</span>
            <div className="flex items-center gap-2">
              {agent.status === "online" ? (
                <CheckCircle2 className="h-4 w-4 text-white md:text-green-500 md:group-hover:text-white" />
              ) : agent.status === "on_call" ? (
                <PhoneCall className="h-4 w-4 text-white md:text-yellow-500 md:group-hover:text-white" />
              ) : (
                <Coffee className="h-4 w-4 text-white md:text-orange-500 md:group-hover:text-white" />
              )}
              <span className="font-medium capitalize text-white md:text-foreground md:group-hover:text-white">
                {agent.status.replace('_', ' ')}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Calls Today</span>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
              <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{agent.calls_today}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Success Rate</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
              <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{agent.success_rate}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Avg Duration</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
              <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{agent.avg_duration}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <div className="flex-1">
            <div className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70 mb-1">
              Performance
            </div>
            <div className="h-2 w-full bg-white/20 md:bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-white md:bg-green-500 transition-all"
                style={{ width: agent.success_rate }}
              />
            </div>
          </div>
          <span className="text-sm font-medium text-white md:text-foreground md:group-hover:text-white">
            {agent.success_rate}
          </span>
        </div>
      </div>
    </Card>
  );
} 