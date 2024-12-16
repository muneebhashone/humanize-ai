import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { agentStatuses } from "@/dummydata";

export function AgentStatusCard() {
  return (
    <Card className="col-span-3 border-0 bg-background shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Agent Status</h3>
        <div className="space-y-4">
          {agentStatuses.map((agent) => (
            <div
              key={agent.name}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-full",
                  "bg-background dark:bg-muted"
                )}>
                  <agent.icon className={cn("h-4 w-4", agent.color)} />
                </div>
                <div>
                  <p className="text-sm font-medium">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.status}</p>
                </div>
              </div>
              {agent.duration && (
                <span className="text-sm text-muted-foreground">
                  {agent.duration}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 