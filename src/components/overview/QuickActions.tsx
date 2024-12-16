"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { quickActions } from "@/dummydata";
import { NewCallModal } from "@/components/modals/NewCallModal";
import { AgentModal } from "@/components/modals/AgentModal";
import { ReportsModal } from "@/components/modals/ReportsModal";
import { AnalyticsModal } from "@/components/modals/AnalyticsModal";

export function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {quickActions.map((action) => (
        <Card key={action.title} className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300">
          {action.title === "New Call" ? (
            <NewCallModal 
              trigger={
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
              }
            />
          ) : action.title === "Add Agent" ? (
            <AgentModal 
              trigger={
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
              }
            />
          ) : action.title === "Reports" ? (
            <ReportsModal 
              trigger={
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
              }
            />
          ) : action.title === "Analytics" ? (
            <AnalyticsModal 
              trigger={
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
              }
            />
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