import { Card } from "@/components/ui/card";
import { Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function AgentStats() {
  return (
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
  );
} 