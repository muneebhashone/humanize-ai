"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, ChevronDown, Bell, Shield, Mail, Activity, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function UserNav() {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 flex items-center w-[240px] px-2 hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-indigo-500/10 dark:hover:from-violet-500/20 dark:hover:to-indigo-500/20 transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Avatar className="h-8 w-8 transition-transform duration-300 hover:scale-105">
                  <AvatarImage src="/avatars/01.png" alt="@user" className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium">
                    JD
                  </AvatarFallback>
                </Avatar>
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900"
                    />
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    John Doe
                  </span>
                  <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                </div>
                <span className="text-xs text-muted-foreground">Administrator</span>
              </div>
            </div>
            <motion.div
              animate={open ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" align="end">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-violet-600/20">
                    <AvatarImage src="/avatars/01.png" alt="@user" className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                    <Sparkles className="h-2 w-2 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      John Doe
                    </p>
                    <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    john@example.com
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Activity className="h-3 w-3" />
                    <span>Active now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md bg-gradient-to-r from-violet-500/10 to-indigo-500/10 dark:from-violet-500/20 dark:to-indigo-500/20 border border-violet-500/20">
                <Shield className="h-4 w-4 text-violet-600" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium">Administrator</span>
                  <span className="text-xs text-muted-foreground">Full access</span>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <motion.div
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              <MenuItemWithAnimation>
                <User className="mr-2 h-4 w-4 text-violet-600" />
                <div className="flex flex-col">
                  <span>Profile</span>
                  <span className="text-xs text-muted-foreground">View profile</span>
                </div>
              </MenuItemWithAnimation>
              <MenuItemWithAnimation>
                <Settings className="mr-2 h-4 w-4 text-emerald-600" />
                <div className="flex flex-col">
                  <span>Settings</span>
                  <span className="text-xs text-muted-foreground">Preferences</span>
                </div>
              </MenuItemWithAnimation>
              <MenuItemWithAnimation>
                <Bell className="mr-2 h-4 w-4 text-orange-600" />
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span>Notifications</span>
                    <span className="text-xs text-muted-foreground">Updates</span>
                  </div>
                  <div className="h-5 min-w-[20px] rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center text-[10px] font-medium px-1">
                    3
                  </div>
                </div>
              </MenuItemWithAnimation>
              <MenuItemWithAnimation>
                <Mail className="mr-2 h-4 w-4 text-blue-600" />
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span>Messages</span>
                    <span className="text-xs text-muted-foreground">Inbox</span>
                  </div>
                  <div className="h-5 min-w-[20px] rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-[10px] font-medium px-1">
                    5
                  </div>
                </div>
              </MenuItemWithAnimation>
            </motion.div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <MenuItemWithAnimation className="text-red-600 focus:text-red-600 focus:bg-red-600/10">
            <LogOut className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>Log out</span>
              <span className="text-xs text-red-600/80">Sign out</span>
            </div>
          </MenuItemWithAnimation>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const MenuItemWithAnimation = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        open: {
          opacity: 1,
          y: 0,
          transition: {
            ease: "easeOut",
          },
        },
        closed: {
          opacity: 0,
          y: -10,
          transition: {
            ease: "easeIn",
          },
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <DropdownMenuItem 
        className={cn(
          "cursor-pointer gap-2 py-2.5 transition-colors duration-150",
          isHovered ? "bg-muted/80" : "hover:bg-muted/50",
          className
        )}
      >
        {children}
      </DropdownMenuItem>
    </motion.div>
  );
}; 