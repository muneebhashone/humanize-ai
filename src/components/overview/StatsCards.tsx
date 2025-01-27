import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { stats } from "@/dummydata";

export function StatsCards() {
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
            <stat.icon className={cn(
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
                <stat.icon className={cn(
                  "h-5 w-5 transition-colors duration-300",
                  "text-white md:text-${stat.color.split('-')[0]}-600 md:dark:text-${stat.color.split('-')[0]}-400",
                  "md:group-hover:text-white"
                )} />
              </div>
             
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