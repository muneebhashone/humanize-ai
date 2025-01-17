"use client"

import { useState } from "react"
import { AgentStats } from "@/components/agents/AgentStats"
import { AgentSearch } from "@/components/agents/AgentSearch"
import { AgentList } from "@/components/agents/AgentList"
import { AgentModal } from "@/components/agents/agent-modal"
import { Agent } from "@/types"

export default function AgentsPage() {
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)

  const handleOnClose =() => {
    console.log('Closing agent modal')
    setEditingAgent(null)
    console.log('Agent modal state cleared')

    setTimeout(() => {
      document.body.style.pointerEvents = "auto"
    }, 500)
      
  }

  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
          <AgentModal />
        </div>

        <AgentStats />

        <div className="space-y-4">
          <AgentSearch />
          <AgentList onEdit={setEditingAgent} />
        </div>
      </div>

      {editingAgent && (
        <AgentModal
          agent={editingAgent}
          onClose={handleOnClose}
        />
      )}
    </main>
  )
} 