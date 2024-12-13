"use client";

import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
 
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const chartData = [
  { month: "January", inbound: 186, outbound: 80 },
  { month: "February", inbound: 305, outbound: 200 },
  { month: "March", inbound: 237, outbound: 120 },
  { month: "April", inbound: 173, outbound: 190 },
  { month: "May", inbound: 309, outbound: 230 },
  { month: "June", inbound: 414, outbound: 340 },
]

const chartConfig = {
  inbound: {
    label: "Inbound Calls",
    color: "hsl(142, 76%, 36%)",
  },
  outbound: {
    label: "Outbound Calls",
    color: "hsl(221, 83%, 53%)",
  },
} satisfies ChartConfig

const stats = [
  {
    title: "Total Inbound",
    value: "1,624",
    change: "+12.3%",
    trend: "up",
  },
  {
    title: "Total Outbound",
    value: "1,160",
    change: "+8.2%",
    trend: "up",
  }
]

export function Overview() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Call Analytics
            </CardTitle>
            <CardDescription className="mt-2">
              January - June 2024
            </CardDescription>
          </div>
          <div className="flex gap-6">
            {stats.map((stat) => (
              <div key={stat.title} className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={cn(
                    "flex items-center text-sm",
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  )}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                className="text-sm font-medium"
              />
              <Tooltip
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                content={(props) => <ChartTooltipContent {...props} config={chartConfig} />}
              />
              <Bar 
                dataKey="inbound" 
                fill="hsl(142, 76%, 36%)"
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="outbound" 
                fill="hsl(221, 83%, 53%)"
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm border-t pt-6">
        <div className="flex gap-2 font-medium leading-none text-green-600">
          <TrendingUp className="h-4 w-4" />
          Overall call volume increased by 15.2% this month
        </div>
        <div className="leading-none text-muted-foreground">
          Showing combined inbound and outbound calls for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
} 