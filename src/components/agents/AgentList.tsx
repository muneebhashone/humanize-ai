"use client";

import { useState } from "react";
import { useAgentsQuery } from "@/hooks/queries/use-agent-queries";
import { Agent } from "@/types";
import { AgentCard } from "./AgentCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

interface AgentListProps {
  onEdit: (agent: Agent) => void;
}

export function AgentList({ onEdit }: AgentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: agents, isLoading } = useAgentsQuery({
    search: debouncedSearch || undefined,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="border-0 bg-background p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[200px] rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!agents?.length) {
    return (
      <div className="space-y-4">
        <Card className="border-0 bg-background p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card>

        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground">No agents found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-0 bg-background p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent._id} agent={agent} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
