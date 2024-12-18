"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routes } from "@/dummydata";

interface DashboardNavProps {
  setOpen?: (open: boolean) => void;
}



export function DashboardNav({ setOpen }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 p-2">
      {routes.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => setOpen?.(false)}
            className={cn(
              "relative w-full p-2 md:p-3 rounded-lg border border-transparent",
              "overflow-hidden group bg-background",
              "hover:bg-accent hover:border-accent dark:hover:bg-accent/10",
              "transition-all duration-300",
              isActive && "border-border dark:border-accent/20 shadow-sm bg-accent/10"
            )}
          >
            {/* Gradient overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r",
              item.color,
              "translate-y-[100%] group-hover:translate-y-[0%]",
              "transition-transform duration-300",
              "opacity-0 group-hover:opacity-10",
              isActive && "translate-y-[0%] opacity-5"
            )} />

            {/* Background Icon */}
            <Icon className={cn(
              "absolute -top-12 -right-12 h-24 md:h-32 w-24 md:w-32",
              "text-muted/25 dark:text-muted/10 rotate-0 group-hover:rotate-12",
              "transition-transform duration-300",
              isActive && "rotate-12 text-accent"
            )} />

            <div className="relative z-10 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Icon className={cn(
                  "h-4 w-4 transition-colors duration-300",
                  isActive 
                    ? "text-foreground dark:text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isActive 
                    ? "text-foreground dark:text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {item.title}
                </span>
              </div>
              <p className={cn(
                "text-xs transition-colors duration-300 pl-6",
                isActive 
                  ? "text-muted-foreground/80"
                  : "text-muted-foreground/60 group-hover:text-muted-foreground/80"
              )}>
                {item.subtitle}
              </p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
} 