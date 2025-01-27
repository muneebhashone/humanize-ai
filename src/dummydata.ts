import {
  BarChart3,
  PlayCircle,
  FileText,
  PhoneCall,
  UserPlus,
  PauseCircle,
  Settings2,
  Settings,
  Megaphone,
  ShieldCheck,
} from "lucide-react";

import { CheckCircle2, Clock, Users } from "lucide-react";

import { Phone } from "lucide-react";

export const stats = [
  {
    title: "Total Calls",
    value: "2,350",

    icon: Phone,
    color: "from-violet-600 to-indigo-600",
    iconColor: "group-hover:text-violet-200",
    bgColor: "violet-100",
  },
  {
    title: "Connected Calls",
    value: "1,203",

    icon: CheckCircle2,
    color: "from-emerald-600 to-teal-600",
    iconColor: "group-hover:text-emerald-200",
    bgColor: "emerald-100",
  },
  {
    title: "Average Duration",
    value: "2.5m",

    icon: Clock,
    color: "from-orange-600 to-amber-600",
    iconColor: "group-hover:text-orange-200",
    bgColor: "orange-100",
  },
  {
    title: "Success Rate",
    value: "51.2%",

    icon: Users,
    color: "from-pink-600 to-rose-600",
    iconColor: "group-hover:text-pink-200",
    bgColor: "pink-100",
  },
];

export const quickActions = [
  {
    title: "New Call",
    description: "Start a new outbound call",
    icon: PhoneCall,
    color: "text-green-500 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-500/10",
  },
  {
    title: "Add Agent",
    description: "Register new agent",
    icon: UserPlus,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    title: "Reports",
    description: "View detailed reports",
    icon: FileText,
    color: "text-purple-500 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    title: "Analytics",
    description: "Check performance",
    icon: BarChart3,
    color: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
  },
];

export const agentStatuses = [
  {
    name: "Sarah Wilson",
    status: "On Call",
    duration: "15:23",
    icon: PhoneCall,
    color: "text-green-500",
  },
  {
    name: "John Davis",
    status: "Available",
    duration: "",
    icon: PlayCircle,
    color: "text-blue-500",
  },
  {
    name: "Emily Brown",
    status: "Break",
    duration: "5:00",
    icon: PauseCircle,
    color: "text-orange-500",
  },
  {
    name: "Michael Lee",
    status: "Training",
    duration: "1:30:00",
    icon: Settings2,
    color: "text-purple-500",
  },
];

export const callstats = [
  {
    title: "Total Calls Today",
    value: "234",
    change: "+12.3%",
    trend: "up",
    color: "from-violet-600 to-indigo-600",
    iconColor: "group-hover:text-violet-200",
    bgColor: "violet-100",
  },
  {
    title: "Average Duration",
    value: "4:25",
    change: "-2.1%",
    trend: "down",
    color: "from-emerald-600 to-teal-600",
    iconColor: "group-hover:text-emerald-200",
    bgColor: "emerald-100",
  },
  {
    title: "Success Rate",
    value: "68%",
    change: "+5.4%",
    trend: "up",
    color: "from-orange-600 to-amber-600",
    iconColor: "group-hover:text-orange-200",
    bgColor: "orange-100",
  },
  {
    title: "Missed Calls",
    value: "12",
    change: "-8.2%",
    trend: "down",
    color: "from-pink-600 to-rose-600",
    iconColor: "group-hover:text-pink-200",
    bgColor: "pink-100",
  },
];

export const calllogs = [
  {
    id: 1,
    type: "outbound",
    status: "completed",
    agent: "Sarah Wilson",
    customer: "John Smith",
    phone: "+1 (555) 123-4567",
    duration: "5:23",
    time: "10:30 AM",
    date: "2024-01-20",
  },
  {
    id: 2,
    type: "inbound",
    status: "missed",
    agent: "Michael Lee",
    customer: "Emma Davis",
    phone: "+1 (555) 987-6543",
    duration: "0:00",
    time: "11:45 AM",
    date: "2024-01-20",
  },
  {
    id: 3,
    type: "outbound",
    status: "completed",
    agent: "Emily Brown",
    customer: "David Wilson",
    phone: "+1 (555) 456-7890",
    duration: "3:45",
    time: "2:15 PM",
    date: "2024-01-20",
  },
  {
    id: 4,
    type: "inbound",
    status: "completed",
    agent: "James Taylor",
    customer: "Sophie Miller",
    phone: "+1 (555) 234-5678",
    duration: "8:12",
    time: "3:30 PM",
    date: "2024-01-20",
  },
];

export const routes = [
  {
    title: "Overview",
    href: "/",
    icon: BarChart3,
    subtitle: "Dashboard stats",
    color: "from-violet-600 to-indigo-600",
  },
  {
    title: "Calls",
    href: "/calls",
    icon: PhoneCall,
    subtitle: "Call history",
    color: "from-blue-600 to-cyan-600",
  },
  {
    title: "Campaigns",
    href: "/campaigns",
    icon: Megaphone,
    subtitle: "Active campaigns",
    color: "from-emerald-600 to-teal-600",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    subtitle: "Call analytics",
    color: "from-violet-600 to-indigo-600",
  },
  {
    title: "Agents",
    href: "/agents",
    icon: Users,
    subtitle: "Team management",
    color: "from-orange-600 to-amber-600",
  },
  {
    title: "Leads",
    href: "/leads",
    icon: Users,
    subtitle: "Leads management",
    color: "from-orange-600 to-amber-600",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    subtitle: "Preferences",
    color: "from-purple-600 to-fuchsia-600",
  },
  {
    title: "Permissions",
    href: "/permissions",
    icon: ShieldCheck,
    subtitle: "User permissions",
    color: "from-orange-600 to-amber-600",
  },
];
