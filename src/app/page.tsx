"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardNav } from "@/components/dashboard/nav";
import { Card } from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { 
  ArrowUpRight, ArrowDownRight, Phone, Users, Clock, CheckCircle2, 
  PhoneCall, PhoneOff, PlayCircle, PauseCircle, UserPlus, FileText,
  BarChart3, Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Total Calls",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: Phone,
    color: "from-violet-600 to-indigo-600",
    iconColor: "group-hover:text-violet-200",
    bgColor: "violet-100"
  },
  {
    title: "Connected Calls",
    value: "1,203",
    change: "+201.2%",
    trend: "up",
    icon: CheckCircle2,
    color: "from-emerald-600 to-teal-600",
    iconColor: "group-hover:text-emerald-200",
    bgColor: "emerald-100"
  },
  {
    title: "Average Duration",
    value: "2.5m",
    change: "+4.1%",
    trend: "up",
    icon: Clock,
    color: "from-orange-600 to-amber-600",
    iconColor: "group-hover:text-orange-200",
    bgColor: "orange-100"
  },
  {
    title: "Success Rate",
    value: "51.2%",
    change: "+12.3%",
    trend: "up",
    icon: Users,
    color: "from-pink-600 to-rose-600",
    iconColor: "group-hover:text-pink-200",
    bgColor: "pink-100"
  },
];

const quickActions = [
  {
    title: "New Call",
    description: "Start a new outbound call",
    icon: PhoneCall,
    color: "text-green-500 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-500/10",
  },
  {
    title: "Add Agent",
    description: "Register new agent",
    icon: UserPlus,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    title: "Reports",
    description: "View detailed reports",
    icon: FileText,
    color: "text-purple-500 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    title: "Analytics",
    description: "Check performance",
    icon: BarChart3,
    color: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
  },
];

const agentStatuses = [
  { name: "Sarah Wilson", status: "On Call", duration: "15:23", icon: PhoneCall, color: "text-green-500" },
  { name: "John Davis", status: "Available", duration: "", icon: PlayCircle, color: "text-blue-500" },
  { name: "Emily Brown", status: "Break", duration: "5:00", icon: PauseCircle, color: "text-orange-500" },
  { name: "Michael Lee", status: "Training", duration: "1:30:00", icon: Settings2, color: "text-purple-500" },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <DashboardNav />
        </aside>
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
      </div>
    </div>
  );
}
