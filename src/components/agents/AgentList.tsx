"use client"

import { useAgentsQuery } from "@/hooks/queries/use-agent-queries"
import { Agent } from "@/types"
import { AgentCard } from "./AgentCard"

interface AgentListProps {
  onEdit: (agent: Agent) => void
}

export function AgentList({ onEdit }: AgentListProps) {
  const { data: agents, isLoading } = useAgentsQuery()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[200px] rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (!agents?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-muted-foreground">No agents found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard
          key={agent._id}
          agent={agent}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
} 