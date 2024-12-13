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
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function UserNav() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-fit px-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 shadow-md">
              <AvatarImage src="/avatars/01.png" alt="@user" className="object-cover" />
              <AvatarFallback className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
            <motion.div
              animate={open ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                John Doe
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                john@example.com
              </p>
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
                Profile
              </MenuItemWithAnimation>
              <MenuItemWithAnimation>
                <Settings className="mr-2 h-4 w-4 text-emerald-600" />
                Settings
              </MenuItemWithAnimation>
            </motion.div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <MenuItemWithAnimation className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </MenuItemWithAnimation>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const MenuItemWithAnimation = ({ children, className }: { children: React.ReactNode; className?: string }) => {
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
    >
      <DropdownMenuItem className={cn("cursor-pointer gap-2", className)}>
        {children}
      </DropdownMenuItem>
    </motion.div>
  );
}; 