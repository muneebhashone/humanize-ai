"use client";

import { Card } from "@/components/ui/card";
import { 
  Users, Phone, Mail, MapPin,
  MoreVertical, Search, ArrowUpRight, ArrowDownRight, 
  Clock, Loader2, Edit, Globe, Home
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
import { useLeadsQuery, useLeadQuery } from "@/hooks/queries/use-leads-queries";
import { useDeleteLeadMutation } from "@/hooks/mutations/use-leads-mutations";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadModal } from "@/components/modals/LeadModal";

const stats = [
  {
    title: "Total Leads",
    value: "1,234",
    change: "+12.3%",
    trend: "up",
    color: "from-violet-600 to-indigo-600",
    iconColor: "group-hover:text-violet-200",
    bgColor: "violet-100"
  },
  {
    title: "Active Leads",
    value: "856",
    change: "+8.2%",
    trend: "up",
    color: "from-emerald-600 to-teal-600",
    iconColor: "group-hover:text-emerald-200",
    bgColor: "emerald-100"
  },
  {
    title: "Conversion Rate",
    value: "42%",
    change: "+5.4%",
    trend: "up",
    color: "from-orange-600 to-amber-600",
    iconColor: "group-hover:text-orange-200",
    bgColor: "orange-100"
  },
  {
    title: "Avg. Response Time",
    value: "2.5h",
    change: "-2.1%",
    trend: "down",
    color: "from-pink-600 to-rose-600",
    iconColor: "group-hover:text-pink-200",
    bgColor: "pink-100"
  },
];

export default function MainLeads() {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    country: ""
  });

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const { data: leads, isLoading } = useLeadsQuery(filters);
  const { data: selectedLead } = useLeadQuery(selectedLeadId || "");
  const deleteLead = useDeleteLeadMutation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleCityChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      city: value === "all" ? "" : value 
    }));
  };

  const handleCountryChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      country: value === "all" ? "" : value 
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLead.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const handleEdit = (id: string) => {
    setSelectedLeadId(id);
  };

  const handleCloseModal = () => {
    setSelectedLeadId(null);
  };

  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
          <div className="flex items-center space-x-2">
            <LeadModal />
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

        <div className="space-y-4">
          <Card className="border-0 bg-background p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search leads..." 
                    className="pl-8" 
                    value={filters.search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <Select
                value={filters.city}
                onValueChange={handleCityChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="paris">Paris</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.country}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !leads?.length ? (
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
              <p>No leads found</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {leads.map((lead) => (
                <Card key={lead._id} className="group relative overflow-hidden border-0 bg-background hover:shadow-lg transition-all duration-300">
                  {/* Gradient Background Overlay */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600",
                      "md:translate-y-[100%] md:group-hover:translate-y-[0%] transition-transform duration-300",
                      "opacity-100 dark:opacity-90"
                    )}
                  />

                  <div className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-lg text-white md:text-foreground md:group-hover:text-white truncate">
                        {lead.name}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-white md:text-muted-foreground md:group-hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(lead._id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(lead._id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Phone</span>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                          <span className="font-medium text-white md:text-foreground md:group-hover:text-white">
                            {lead.phone}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Email</span>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                          <span className="font-medium text-white md:text-foreground md:group-hover:text-white truncate">
                            {lead.email}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">City</span>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                          <span className="font-medium text-white md:text-foreground md:group-hover:text-white">
                            {lead.city}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Country</span>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                          <span className="font-medium text-white md:text-foreground md:group-hover:text-white">
                            {lead.country}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="space-y-1">
                        <span className="text-xs text-white/70 md:text-muted-foreground md:group-hover:text-white/70">Address</span>
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                          <span className="font-medium text-white md:text-foreground md:group-hover:text-white line-clamp-1">
                            {lead.address}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-white md:text-muted-foreground md:group-hover:text-white" />
                          <span className="text-white/70 md:text-muted-foreground md:group-hover:text-white/70">
                            Created: {new Date(lead.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedLeadId && (
        <LeadModal 
          lead={selectedLead}
          onOpenChange={(open: boolean) => !open && handleCloseModal()}
        />
      )}
    </main>
  );
}