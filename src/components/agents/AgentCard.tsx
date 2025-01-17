"use client"

import { Agent } from "@/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PhoneCall, Clock, CheckCircle2, Coffee, MoreVertical, Pencil, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDeleteAgentMutation } from "@/hooks/mutations/use-agent-mutations"
import { toast } from "sonner"

interface AgentCardProps {
  agent: Agent
  onEdit: (agent: Agent) => void
}

export function AgentCard({ agent, onEdit }: AgentCardProps) {
  const deleteAgent = useDeleteAgentMutation()

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      deleteAgent.mutate(agent._id, {
        onSuccess: () => {
          toast.success("Agent deleted successfully")
        },
      })
    }
  }

  // Calculate success rate from agent data (example calculation)
  const successRate = "75%"
  const callsToday = 28
  const avgDuration = "4:30"

  // Get color based on status
  const getStatusColor = () => {
    switch (agent.status) {
      case "active":
        return "from-green-600 to-emerald-600"
      case "inactive":
        return "from-orange-600 to-red-600"
      case "busy":
        return "from-yellow-600 to-amber-600"
      default:
        return "from-blue-600 to-cyan-600"
    }
  }

  return (
    <Card className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300">
      {/* Gradient Background Overlay */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r",
          getStatusColor(),
          "md:translate-y-[100%] md:group-hover:translate-y-[0%] transition-transform duration-300",
          "opacity-100 dark:opacity-90"
        )}
      />

      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white/20 md:border-background md:group-hover:border-white/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.name}`} />
              <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white md:text-foreground md:group-hover:text-white">
                {agent.name}
              </h3>
              <p className="text-sm text-white/70 md:text-muted-foreground md:group-hover:text-white/70">
                {agent.dept}
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
              <DropdownMenuItem onClick={() => onEdit(agent)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={handleDelete}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Status</span>
            <div className="flex items-center gap-2">
              {agent.status === "active" ? (
                <CheckCircle2 className="h-4 w-4 text-white md:text-green-500 md:group-hover:text-white" />
              ) : agent.status === "busy" ? (
                <PhoneCall className="h-4 w-4 text-white md:text-yellow-500 md:group-hover:text-white" />
              ) : (
                <Coffee className="h-4 w-4 text-white md:text-orange-500 md:group-hover:text-white" />
              )}
              <span className="font-medium capitalize text-white md:text-foreground md:group-hover:text-white">
                {agent.status}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Calls Today</span>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
              <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{callsToday}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Success Rate</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
              <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{successRate}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Avg Duration</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
              <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{avgDuration}</span>
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
                style={{ width: successRate }}
              />
            </div>
          </div>
          <span className="text-sm font-medium text-white md:text-foreground md:group-hover:text-white">
            {successRate}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          {agent.tools?.map((tool) => (
            <span 
              key={tool}
              className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white md:bg-secondary md:text-foreground md:group-hover:bg-white/10 md:group-hover:text-white"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
} 