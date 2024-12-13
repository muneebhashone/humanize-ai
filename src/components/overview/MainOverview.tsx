import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

import React from 'react'
import { Overview } from "../overview";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { ArrowDownRight } from "lucide-react";
import { CalendarDateRangePicker } from "../date-range-picker";
import { stats, quickActions, agentStatuses } from "@/dummydata";

const MainOverview = () => {
  return (
    <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <CalendarDateRangePicker />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card 
                  key={stat.title} 
                  className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300"
                >
                  {/* Gradient Background Overlay */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300",
                      stat.color,
                      "opacity-100 dark:opacity-90"
                    )}
                  />
                  
                  {/* Large Background Icon */}
                  <div className="absolute -top-12 -right-12 transition-all duration-300">
                    <stat.icon className={cn(
                      "h-32 w-32 rotate-0 group-hover:rotate-12 transition-all duration-300",
                      "text-muted/25 dark:text-muted/10",
                      stat.iconColor
                    )} />
                  </div>

                  <div className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn(
                        "p-2 rounded-lg transition-colors duration-300",
                        `bg-${stat.bgColor} dark:bg-gray-800 group-hover:bg-white/20`
                      )}>
                        <stat.icon className={cn(
                          "h-5 w-5 transition-colors duration-300",
                          `text-${stat.color.split('-')[0]}-600 dark:text-${stat.color.split('-')[0]}-400`,
                          "group-hover:text-white"
                        )} />
                      </div>
                      <span className={cn(
                        "flex items-center text-sm font-medium gap-1 px-2 py-1 rounded-full transition-colors duration-300",
                        stat.trend === "up" 
                          ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-400/10 group-hover:bg-white/20 group-hover:text-white" 
                          : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-400/10 group-hover:bg-white/20 group-hover:text-white"
                      )}>
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        {stat.change}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground group-hover:text-white/80 transition-colors duration-300">
                        {stat.title}
                      </h3>
                      <div className="text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Card key={action.title} className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300">
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
                </Card>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 border-0 bg-background shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <Overview />
                </div>
              </Card>
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
            </div>
          </div>
        </main>
  )
}

export default MainOverview