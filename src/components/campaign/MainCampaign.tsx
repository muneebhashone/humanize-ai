"use client";

import { Card } from "@/components/ui/card";
import { 
  Play, Pause, BarChart2, Users, Phone, 
  Plus, MoreVertical, Search, ArrowUpRight, ArrowDownRight, 
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const stats = [
  {
    title: "Active Campaigns",
    value: "24",
    change: "+12.3%",
    trend: "up",
    color: "from-violet-600 to-indigo-600",
    iconColor: "group-hover:text-violet-200",
    bgColor: "violet-100"
  },
  {
    title: "Total Agents",
    value: "156",
    change: "+8.2%",
    trend: "up",
    color: "from-emerald-600 to-teal-600",
    iconColor: "group-hover:text-emerald-200",
    bgColor: "emerald-100"
  },
  {
    title: "Success Rate",
    value: "68%",
    change: "+5.4%",
    trend: "up",
    color: "from-orange-600 to-amber-600",
    iconColor: "group-hover:text-orange-200",
    bgColor: "orange-100"
  },
  {
    title: "Avg. Duration",
    value: "4:25",
    change: "-2.1%",
    trend: "down",
    color: "from-pink-600 to-rose-600",
    iconColor: "group-hover:text-pink-200",
    bgColor: "pink-100"
  },
];

const campaigns = [
  {
    id: 1,
    name: "Q1 Sales Outreach",
    status: "active",
    agents: 12,
    calls: 1250,
    completed: 450,
    success_rate: "36%",
    progress: 36,
    color: "from-green-600 to-emerald-600",
  },
  {
    id: 2,
    name: "Customer Feedback",
    status: "paused",
    agents: 8,
    calls: 800,
    completed: 600,
    success_rate: "75%",
    progress: 75,
    color: "from-yellow-600 to-amber-600",
  },
  {
    id: 3,
    name: "Product Launch",
    status: "scheduled",
    agents: 15,
    calls: 2000,
    completed: 0,
    success_rate: "0%",
    progress: 0,
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 4,
    name: "Support Follow-up",
    status: "active",
    agents: 10,
    calls: 950,
    completed: 380,
    success_rate: "40%",
    progress: 40,
    color: "from-violet-600 to-purple-600",
  },
];

export default function MainCampaign() {
  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
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
                  "absolute inset-0 bg-gradient-to-r",
                  stat.color,
                  "md:translate-y-[100%] md:group-hover:translate-y-[0%] transition-transform duration-300",
                  "opacity-100 dark:opacity-90"
                )}
              />
              
              {/* Large Background Icon */}
              <div className="absolute -top-12 -right-12 transition-all duration-300">
                <BarChart2 className={cn(
                  "h-32 w-32 rotate-12 md:rotate-0 md:group-hover:rotate-12 transition-all duration-300",
                  "text-muted/25 dark:text-muted/10",
                  stat.iconColor
                )} />
              </div>

              <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors duration-300",
                    "bg-white/20 md:bg-${stat.bgColor} dark:bg-gray-800 md:group-hover:bg-white/20"
                  )}>
                    <BarChart2 className={cn(
                      "h-5 w-5 transition-colors duration-300",
                      "text-white md:text-${stat.color.split('-')[0]}-600 md:dark:text-${stat.color.split('-')[0]}-400",
                      "md:group-hover:text-white"
                    )} />
                  </div>
                  <span className={cn(
                    "flex items-center text-sm font-medium gap-1 px-2 py-1 rounded-full transition-colors duration-300",
                    stat.trend === "up" 
                      ? "text-white bg-white/20 md:text-green-700 md:bg-green-100 md:dark:text-green-400 md:dark:bg-green-400/10 md:group-hover:bg-white/20 md:group-hover:text-white" 
                      : "text-white bg-white/20 md:text-red-700 md:bg-red-100 md:dark:text-red-400 md:dark:bg-red-400/10 md:group-hover:bg-white/20 md:group-hover:text-white"
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
                  <h3 className="text-sm font-medium text-white md:text-muted-foreground md:group-hover:text-white/80 transition-colors duration-300">
                    {stat.title}
                  </h3>
                  <div className="text-2xl font-bold text-white md:text-foreground md:group-hover:text-white transition-colors duration-300">
                    {stat.value}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="border-0 bg-background p-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search campaigns..." className="pl-8" />
                </div>
              </div>
              <Button variant="outline">Filters</Button>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300">
                {/* Gradient Background Overlay */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r",
                    campaign.color,
                    "md:translate-y-[100%] md:group-hover:translate-y-[0%] transition-transform duration-300",
                    "opacity-100 dark:opacity-90"
                  )}
                />

                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg text-white md:text-foreground md:group-hover:text-white truncate">
                      {campaign.name}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white md:text-muted-foreground md:group-hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Agents</span>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                        <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{campaign.agents}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Total Calls</span>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                        <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{campaign.calls}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Success Rate</span>
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                        <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{campaign.success_rate}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Status</span>
                      <div className="flex items-center gap-2">
                        {campaign.status === "active" ? (
                          <Play className="h-4 w-4 text-white md:text-green-500 md:group-hover:text-white" />
                        ) : campaign.status === "paused" ? (
                          <Pause className="h-4 w-4 text-white md:text-yellow-500 md:group-hover:text-white" />
                        ) : (
                          <Clock className="h-4 w-4 text-white md:text-blue-500 md:group-hover:text-white" />
                        )}
                        <span className="font-medium capitalize text-white md:text-foreground md:group-hover:text-white">
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Progress</span>
                      <span className="text-xs font-medium text-white md:text-foreground md:group-hover:text-white">
                        {campaign.completed}/{campaign.calls}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/20 md:bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all",
                          campaign.status === "active" && "bg-white md:bg-green-500",
                          campaign.status === "paused" && "bg-white md:bg-yellow-500",
                          campaign.status === "scheduled" && "bg-white md:bg-blue-500"
                        )}
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 