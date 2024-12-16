"use client";

import { Card } from "@/components/ui/card";
import { 
  PhoneCall, Clock, Search, 
  MoreVertical, ArrowUpRight, ArrowDownRight,
  UserPlus, Users, Coffee, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const stats = [
  {
    title: "Total Agents",
    value: "156",
    change: "+12.3%",
    trend: "up",
    color: "from-violet-600 to-indigo-600",
    iconColor: "group-hover:text-violet-200",
    bgColor: "violet-100"
  },
  {
    title: "Active Now",
    value: "89",
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
    title: "Avg. Performance",
    value: "92%",
    change: "-2.1%",
    trend: "down",
    color: "from-pink-600 to-rose-600",
    iconColor: "group-hover:text-pink-200",
    bgColor: "pink-100"
  },
];

const agents = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    role: "Senior Agent",
    status: "online",
    calls_today: 45,
    success_rate: "78%",
    avg_duration: "4:30",
    avatar: "/avatars/01.png",
    color: "from-green-600 to-emerald-600",
  },
  {
    id: 2,
    name: "Michael Lee",
    email: "michael.l@example.com",
    role: "Agent",
    status: "on_call",
    calls_today: 32,
    success_rate: "65%",
    avg_duration: "5:15",
    avatar: "/avatars/02.png",
    color: "from-yellow-600 to-amber-600",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.d@example.com",
    role: "Team Lead",
    status: "break",
    calls_today: 28,
    success_rate: "82%",
    avg_duration: "3:45",
    avatar: "/avatars/03.png",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 4,
    name: "James Taylor",
    email: "james.t@example.com",
    role: "Senior Agent",
    status: "online",
    calls_today: 38,
    success_rate: "75%",
    avg_duration: "4:10",
    avatar: "/avatars/04.png",
    color: "from-violet-600 to-purple-600",
  },
  {
    id: 5,
    name: "Sophia Chen",
    email: "sophia.c@example.com",
    role: "Agent",
    status: "on_call",
    calls_today: 29,
    success_rate: "70%",
    avg_duration: "4:45",
    avatar: "/avatars/05.png",
    color: "from-pink-600 to-rose-600",
  },
  {
    id: 6,
    name: "Daniel Kim",
    email: "daniel.k@example.com",
    role: "Agent",
    status: "break",
    calls_today: 25,
    success_rate: "68%",
    avg_duration: "5:00",
    avatar: "/avatars/06.png",
    color: "from-orange-600 to-red-600",
  },
];

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
                <Users className={cn(
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
                    <Users className={cn(
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
                  <Input placeholder="Search agents..." className="pl-8" />
                </div>
              </div>
              <Button variant="outline">Filters</Button>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <Card key={agent.id} className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300">
                {/* Gradient Background Overlay */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r",
                    agent.color,
                    "md:translate-y-[100%] md:group-hover:translate-y-[0%] transition-transform duration-300",
                    "opacity-100 dark:opacity-90"
                  )}
                />

                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white/20 md:border-background md:group-hover:border-white/20">
                        <AvatarImage src={agent.avatar} />
                        <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white md:text-foreground md:group-hover:text-white">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-white/70 md:text-muted-foreground md:group-hover:text-white/70">
                          {agent.role}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white md:text-muted-foreground md:group-hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Status</span>
                      <div className="flex items-center gap-2">
                        {agent.status === "online" ? (
                          <CheckCircle2 className="h-4 w-4 text-white md:text-green-500 md:group-hover:text-white" />
                        ) : agent.status === "on_call" ? (
                          <PhoneCall className="h-4 w-4 text-white md:text-yellow-500 md:group-hover:text-white" />
                        ) : (
                          <Coffee className="h-4 w-4 text-white md:text-orange-500 md:group-hover:text-white" />
                        )}
                        <span className="font-medium capitalize text-white md:text-foreground md:group-hover:text-white">
                          {agent.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Calls Today</span>
                      <div className="flex items-center gap-2">
                        <PhoneCall className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                        <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{agent.calls_today}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Success Rate</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                        <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{agent.success_rate}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Avg Duration</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                        <span className="font-medium text-white md:text-foreground md:group-hover:text-white">{agent.avg_duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1">
                      <div className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70 mb-1">
                        Performance
                      </div>
                      <div className="h-2 w-full bg-white/20 md:bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-white md:bg-green-500 transition-all"
                          style={{ width: agent.success_rate }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white md:text-foreground md:group-hover:text-white">
                      {agent.success_rate}
                    </span>
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