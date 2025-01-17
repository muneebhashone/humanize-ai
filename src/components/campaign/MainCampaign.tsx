"use client";

import { Card } from "@/components/ui/card";
import { 
  Play, Pause, BarChart2, Users, 
  MoreVertical, Search, ArrowUpRight, ArrowDownRight, 
  Clock, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CampaignModal } from "@/components/modals/CampaignModal";
import { useCampaignsQuery, useCampaignQuery } from "@/hooks/queries/use-campaign-queries";
import { useDeleteCampaignMutation } from "@/hooks/mutations/use-campaign-mutations";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  {
    title: "Active Campaigns",
    value: "24",
    change: "+12.3%",
    trend: "up",
    color: "from-violet-600 to-indigo-600",
    iconColor: "group-hover:text-violet-200",
    bgColor: "violet-100"
  },
  {
    title: "Total Agents",
    value: "156",
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
    title: "Avg. Duration",
    value: "4:25",
    change: "-2.1%",
    trend: "down",
    color: "from-pink-600 to-rose-600",
    iconColor: "group-hover:text-pink-200",
    bgColor: "pink-100"
  },
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "In Progress", value: "progress" },
  { label: "Stopped", value: "stop" },
  { label: "Completed", value: "completed" },
];

export default function MainCampaign() {
  const [filters, setFilters] = useState({
    search: "",
    status: "all"
  });

  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const deleteCampaign = useDeleteCampaignMutation();

  const { data: campaigns, isLoading } = useCampaignsQuery({
    search: filters.search,
    status: filters.status === "all" ? undefined : filters.status
  });
  
  const { data: selectedCampaign } = useCampaignQuery(selectedCampaignId || "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      status: value 
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "progress":
        return "from-green-600 to-emerald-600";
      case "stop":
        return "from-yellow-600 to-amber-600";
      case "completed":
        return "from-blue-600 to-cyan-600";
      default:
        return "from-violet-600 to-purple-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "progress":
        return <Play className="h-4 w-4 text-white md:text-green-500 md:group-hover:text-white" />;
      case "stop":
        return <Pause className="h-4 w-4 text-white md:text-yellow-500 md:group-hover:text-white" />;
      case "completed":
        return <Clock className="h-4 w-4 text-white md:text-blue-500 md:group-hover:text-white" />;
      default:
        return <Clock className="h-4 w-4 text-white md:text-violet-500 md:group-hover:text-white" />;
    }
  };

  const handleEdit = (id: string) => {
    setSelectedCampaignId(id);
  };

  const handleCloseModal = () => {
    setSelectedCampaignId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCampaign.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  };

  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
          <div className="flex items-center space-x-2">
            <CampaignModal />
          </div>
        </div>

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
                <BarChart2 className={cn(
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
                    <BarChart2 className={cn(
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

        <div className="space-y-4">
          <Card className="border-0 bg-background p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search campaigns..." 
                    className="pl-8" 
                    value={filters.search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <Select
                value={filters.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !campaigns?.length ? (
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
              <p>No campaigns found</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <Card key={campaign._id} className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300">
                  {/* Gradient Background Overlay */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r",
                      getStatusColor(campaign.status),
                      "md:translate-y-[100%] md:group-hover:translate-y-[0%] transition-transform duration-300",
                      "opacity-100 dark:opacity-90"
                    )}
                  />

                  <div className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-lg text-white md:text-foreground md:group-hover:text-white truncate">
                        {campaign.name}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-white md:text-muted-foreground md:group-hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(campaign._id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(campaign._id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Agents</span>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                          <span className="font-medium text-white md:text-foreground md:group-hover:text-white">
                            {campaign.agents_ids.length}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Knowledge Base</span>
                        <div className="flex items-center gap-2">
                          <BarChart2 className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                          <span className="font-medium capitalize text-white md:text-foreground md:group-hover:text-white">
                            {campaign.knowledge_base}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Status</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(campaign.status)}
                          <span className="font-medium capitalize text-white md:text-foreground md:group-hover:text-white">
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Created</span>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                          <span className="font-medium text-white md:text-foreground md:group-hover:text-white">
                            {new Date(campaign.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm text-white/70 md:text-muted-foreground md:group-hover:text-white/70 line-clamp-2">
                        {campaign.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedCampaignId && (
        <CampaignModal 
          campaign={selectedCampaign}
          onOpenChange={(open) => !open && handleCloseModal()}
        />
      )}
    </main>
  );
} 