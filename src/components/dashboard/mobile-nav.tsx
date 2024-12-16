"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardNav } from "./nav";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative mr-2 h-9 w-9 p-0 xl:hidden",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:bg-accent focus-visible:text-accent-foreground",
            "data-[state=open]:bg-accent/50",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <motion.div
            animate={open ? { rotate: 180, scale: 0.8 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <Menu className="h-5 w-5" />
            {/* Ripple Effect */}
            {open && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-accent/50"
              />
            )}
          </motion.div>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className={cn(
          "w-[300px] p-0",
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="flex h-full flex-col"
        >
          <div className="px-2 py-4">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Navigation
            </h2>
            <DashboardNav setOpen={setOpen} />
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
} 