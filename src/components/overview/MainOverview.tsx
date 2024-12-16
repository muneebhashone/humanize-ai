
import { Overview } from "../overview";
import { StatsCards } from "./StatsCards";
import { QuickActions } from "./QuickActions";
import { AgentStatusCard } from "./AgentStatusCard";
import { Card } from "../ui/card";

export function MainOverview() {
  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        
        {/* Stats Cards */}
        <StatsCards />

        {/* Quick Actions */}
        <QuickActions />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Overview Chart */}
          <Card className="col-span-4 border-0 bg-background shadow-md hover:shadow-lg transition-all duration-300">
            
              <Overview />
            
          </Card>
       

          {/* Agent Status */}
          <AgentStatusCard />
        </div>
      </div>
    </main>
  );
}
