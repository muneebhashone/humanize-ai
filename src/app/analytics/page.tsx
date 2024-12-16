"use client";

import { Card } from "@/components/ui/card";
import { 
  BarChart2, TrendingUp, Clock, 
  ArrowUpRight, ArrowDownRight, Download,
  Phone, Users, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const stats = [
  {
    title: "Total Calls",
    value: "12,543",
    change: "+12.3%",
    trend: "up",
    color: "from-violet-600 to-indigo-600",
    iconColor: "group-hover:text-violet-200",
    bgColor: "violet-100"
  },
  {
    title: "Avg. Duration",
    value: "4:35",
    change: "-2.1%",
    trend: "down",
    color: "from-emerald-600 to-teal-600",
    iconColor: "group-hover:text-emerald-200",
    bgColor: "emerald-100"
  },
  {
    title: "Success Rate",
    value: "68.2%",
    change: "+5.4%",
    trend: "up",
    color: "from-orange-600 to-amber-600",
    iconColor: "group-hover:text-orange-200",
    bgColor: "orange-100"
  },
  {
    title: "Active Agents",
    value: "24",
    change: "0%",
    trend: "neutral",
    color: "from-pink-600 to-rose-600",
    iconColor: "group-hover:text-pink-200",
    bgColor: "pink-100"
  },
];

const hourlyData = [
  { hour: "9 AM", calls: 45, success: 35 },
  { hour: "10 AM", calls: 78, success: 62 },
  { hour: "11 AM", calls: 92, success: 75 },
  { hour: "12 PM", calls: 65, success: 48 },
  { hour: "1 PM", calls: 89, success: 70 },
  { hour: "2 PM", calls: 106, success: 88 },
  { hour: "3 PM", calls: 85, success: 65 },
  { hour: "4 PM", calls: 72, success: 58 },
  { hour: "5 PM", calls: 54, success: 42 },
];

const performanceData = [
  { day: "Mon", performance: 85 },
  { day: "Tue", performance: 92 },
  { day: "Wed", performance: 88 },
  { day: "Thu", performance: 95 },
  { day: "Fri", performance: 89 },
  { day: "Sat", performance: 78 },
  { day: "Sun", performance: 82 },
];

export default function AnalyticsPage() {
  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
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
                      : stat.trend === "down"
                      ? "text-white bg-white/20 md:text-red-700 md:bg-red-100 md:dark:text-red-400 md:dark:bg-red-400/10 md:group-hover:bg-white/20 md:group-hover:text-white"
                      : "text-white bg-white/20 md:text-yellow-700 md:bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-400/10 md:group-hover:bg-white/20 md:group-hover:text-white"
                  )}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : stat.trend === "down" ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : (
                      <TrendingUp className="h-4 w-4 rotate-90" />
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-0 bg-background">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Call Volume Overview</h3>
                  <p className="text-sm text-muted-foreground">
                    Hourly distribution of calls and success rate
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Last 24 Hours
                </Button>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <XAxis 
                      dataKey="hour"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="calls"
                      fill="hsl(221, 83%, 53%)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="success"
                      fill="hsl(142, 76%, 36%)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          <Card className="col-span-3 border-0 bg-background">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Performance Trend</h3>
                  <p className="text-sm text-muted-foreground">
                    Weekly performance metrics
                  </p>
                </div>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <XAxis
                      dataKey="day"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      strokeWidth={2}
                      dataKey="performance"
                      stroke="hsl(142, 76%, 36%)"
                      dot={{ fill: "hsl(142, 76%, 36%)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 bg-background">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Call Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Inbound</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold">2,350</span>
                    <span className="text-sm text-green-600">+12.3%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Outbound</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold">1,203</span>
                    <span className="text-sm text-green-600">+8.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-0 bg-background">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Agent Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-violet-500" />
                    <span className="text-sm font-medium">Active Agents</span>
                  </div>
                  <span className="text-2xl font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Success Rate</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold">78%</span>
                    <span className="text-sm text-green-600">+5.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-0 bg-background">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Call Duration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Average</span>
                  </div>
                  <span className="text-2xl font-bold">4:35</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Peak Hours</span>
                  </div>
                  <span className="text-2xl font-bold">2-4 PM</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
} 