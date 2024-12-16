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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => {
          const ActionModal = action.title === "New Call" 
            ? NewCallModal 
            : action.title === "Add Agent" 
            ? AgentModal 
            : action.title === "Reports" 
            ? ReportsModal 
            : action.title === "Analytics" 
            ? AnalyticsModal 
            : null;

          const cardContent = (
            <Button 
              variant="ghost" 
              className="relative w-full h-full p-6 overflow-hidden group"
            >
              {/* Gradient Background Overlay */}
              <div 
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  action.title === "New Call" && "from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10",
                  action.title === "Add Agent" && "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10",
                  action.title === "Reports" && "from-purple-500/20 to-violet-500/20 dark:from-purple-500/10 dark:to-violet-500/10",
                  action.title === "Analytics" && "from-orange-500/20 to-amber-500/20 dark:from-orange-500/10 dark:to-amber-500/10"
                )}
              />
              
              {/* Content */}
              <div className="relative flex flex-col items-center gap-4 group-hover:scale-105 transition-transform duration-500">
                {/* Icon Container */}
                <div 
                  className={cn(
                    "p-4 rounded-xl transition-all duration-500 group-hover:shadow-lg",
                    action.bgColor,
                    "group-hover:bg-gradient-to-br",
                    action.title === "New Call" && "group-hover:from-green-100 group-hover:to-emerald-100 dark:group-hover:from-green-500/20 dark:group-hover:to-emerald-500/20",
                    action.title === "Add Agent" && "group-hover:from-blue-100 group-hover:to-cyan-100 dark:group-hover:from-blue-500/20 dark:group-hover:to-cyan-500/20",
                    action.title === "Reports" && "group-hover:from-purple-100 group-hover:to-violet-100 dark:group-hover:from-purple-500/20 dark:group-hover:to-violet-500/20",
                    action.title === "Analytics" && "group-hover:from-orange-100 group-hover:to-amber-100 dark:group-hover:from-orange-500/20 dark:group-hover:to-amber-500/20"
                  )}
                >
                  <action.icon 
                    className={cn(
                      "h-6 w-6 transition-transform duration-500 group-hover:scale-110",
                      action.color
                    )} 
                  />
                </div>

                {/* Text Content */}
                <div className="text-center space-y-1.5">
                  <h3 className="font-semibold text-base group-hover:text-foreground/90 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/60 transition-colors">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-foreground/10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-foreground/10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
            </Button>
          );

          return (
            <Card 
              key={action.title} 
              className="group relative overflow-hidden border-0 bg-background hover:shadow-xl transition-all duration-500 rounded-xl"
            >
              {ActionModal ? (
                <ActionModal trigger={cardContent} />
              ) : (
                cardContent
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
} 