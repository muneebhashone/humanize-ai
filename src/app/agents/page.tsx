

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { AgentStats } from "@/components/agents/AgentStats";
import { AgentSearch } from "@/components/agents/AgentSearch";
import { AgentList } from "@/components/agents/AgentList";

export default function AgentsPage() {
  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Agent
          </Button>
        </div>

        <AgentStats />

        <div className="space-y-4">
          <AgentSearch />
          <AgentList />
        </div>
      </div>
    </main>
  );
} 