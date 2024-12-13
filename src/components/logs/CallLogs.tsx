import { cn } from '@/lib/utils'
import React from 'react'
import { Card } from '../ui/card'
import { Clock, PhoneCall, PhoneOff, Search, ArrowDownRight, ArrowUpRight, Download } from 'lucide-react'
import { calllogs, callstats } from '@/dummydata'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { CalendarDateRangePicker } from '../date-range-picker'

const CallLogs = () => {
  return (
    <main className="flex w-full flex-col overflow-hidden">
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Call Logs</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {callstats.map((stat) => (
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
              <PhoneCall className={cn(
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
                  <PhoneCall className={cn(
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

      <div className="space-y-4">
        <Card className="border-0 bg-background p-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search calls..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Last 7 Days
            </Button>
            <Button variant="outline">Filters</Button>
          </div>
        </Card>

        <Card className="border-0 bg-background">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Agent</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Phone</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Duration</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Time</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {calllogs.map((call) => (
                  <tr
                    key={call.id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4">
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        call.type === "outbound" 
                          ? "bg-green-100 dark:bg-green-500/20" 
                          : "bg-blue-100 dark:bg-blue-500/20"
                      )}>
                        {call.type === "outbound" ? (
                          <PhoneCall className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <PhoneOff className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{call.agent}</td>
                    <td className="p-4">{call.customer}</td>
                    <td className="p-4 font-mono text-sm">{call.phone}</td>
                    <td className="p-4">{call.duration}</td>
                    <td className="p-4">{call.time}</td>
                    <td className="p-4">{call.date}</td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          call.status === "completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                        )}
                      >
                        {call.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  </main>
  )
}

export default CallLogs