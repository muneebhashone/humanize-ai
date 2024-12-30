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
import { Bell, CheckCheck, PhoneCall, UserPlus, AlertTriangle, BarChart3, LucideIcon } from "lucide-react";
import { motion} from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "New Agent Joined",
    description: "Sarah Wilson has joined the team",
    time: "2 min ago",
    icon: UserPlus,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    read: false,
  },
  {
    id: 2,
    title: "Missed Call",
    description: "You missed a call from +1 (555) 000-0000",
    time: "10 min ago",
    icon: PhoneCall,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
    read: false,
  },
  {
    id: 3,
    title: "Performance Alert",
    description: "Call success rate dropped below 70%",
    time: "1 hour ago",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-500/10",
    read: false,
  },
  {
    id: 4,
    title: "Weekly Report",
    description: "Your weekly performance report is ready",
    time: "2 hours ago",
    icon: BarChart3,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    read: true,
  },
];

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-indigo-500/10 dark:hover:from-violet-500/20 dark:hover:to-indigo-500/20 transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Bell className={cn(
            "h-5 w-5 transition-colors duration-300",
            isHovered ? "text-violet-600" : "text-muted-foreground"
          )} />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 h-4 min-w-[16px] rounded-full bg-violet-600 text-[10px] font-medium text-white flex items-center justify-center px-1">
              {unreadCount}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-violet-500/10">
                  <Bell className="h-4 w-4 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">You have {unreadCount} unread messages</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </Button>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="max-h-[300px] overflow-auto">
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
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </motion.div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full flex justify-center text-sm text-violet-600 focus:text-violet-600 focus:bg-violet-600/10 cursor-pointer">
            View all notifications
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
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
          "flex items-start gap-3 py-3 px-4 cursor-pointer transition-colors duration-150",
          isHovered ? "bg-muted/80" : "hover:bg-muted/50",
          !notification.read && "bg-violet-500/5"
        )}
      >
        <div className={cn("p-2 rounded-full", notification.bgColor)}>
          <notification.icon className={cn("h-4 w-4", notification.color)} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <p className={cn(
              "text-sm font-medium",
              !notification.read && "text-violet-600"
            )}>
              {notification.title}
            </p>
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {notification.time}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            {notification.description}
          </p>
        </div>
      </DropdownMenuItem>
    </motion.div>
  );
}; 