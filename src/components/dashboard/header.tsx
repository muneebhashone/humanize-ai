"use client";

import Link from "next/link";
import { UserNav } from "@/components/dashboard/user-nav";
import { Sparkles, Bell, Phone, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "./mobile-nav";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Navigation */}
          <MobileNav />

          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 md:gap-3 transition-all hover:opacity-80 group"
          >
            <div className="relative">
              <div className="relative">
                {/* Main Logo Background */}
                <div className="p-2.5 md:p-3 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-600 rotate-6 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  {/* Inner Icon */}
                  <div className="relative">
                    <Phone className="h-4 w-4 md:h-5 md:w-5 text-white rotate-[-6deg] group-hover:rotate-[-12deg] transition-all duration-300" />
                    <Headphones className="absolute -bottom-1.5 -right-1.5 h-3 w-3 md:h-4 md:w-4 text-cyan-300 animate-pulse" />
                  </div>
                </div>
                {/* Decorative Elements */}
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 md:h-3.5 md:w-3.5 text-amber-500 animate-pulse" />
                <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-violet-300 animate-ping" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    Humanize
                  </span>
                  <span className="font-semibold text-base md:text-lg bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:w-2 transition-all duration-300" />
                  <span className="text-[10px] md:text-xs text-muted-foreground/80 font-medium">
                    Intelligent Conversations
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications - Hide on smallest screens */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:flex hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-700 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Divider - Hide on smallest screens */}
          <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-gray-800" />

          {/* User Navigation */}
          <UserNav />
        </div>
      </div>
    </header>
  );
} 