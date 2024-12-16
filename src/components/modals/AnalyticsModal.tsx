"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3, Calendar, Filter, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CalendarDateRangePicker } from "@/components/date-range-picker";

interface AnalyticsModalProps {
  trigger: React.ReactNode;
}

export function AnalyticsModal({ trigger }: AnalyticsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-500/10">
              <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <DialogTitle className="text-xl">View Analytics</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Analyze performance metrics and insights
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Analytics Type Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              Analytics Type
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="analytics-type" className="text-sm font-medium">
                  Select Metrics
                </Label>
                <Select>
                  <SelectTrigger id="analytics-type">
                    <SelectValue placeholder="Choose analytics type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call-metrics">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        Call Metrics
                      </div>
                    </SelectItem>
                    <SelectItem value="agent-insights">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        Agent Insights
                      </div>
                    </SelectItem>
                    <SelectItem value="campaign-performance">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        Campaign Performance
                      </div>
                    </SelectItem>
                    <SelectItem value="conversion-rates">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        Conversion Rates
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Time Period */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Time Period
            </div>
            <Separator />
            <CalendarDateRangePicker />
          </div>

          {/* View Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              View Options
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="visualization" className="text-sm font-medium">
                  Visualization Type
                </Label>
                <Select>
                  <SelectTrigger id="visualization">
                    <SelectValue placeholder="Select visualization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="table">Data Table</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comparison" className="text-sm font-medium">
                  Comparison
                </Label>
                <Select>
                  <SelectTrigger id="comparison">
                    <SelectValue placeholder="Select comparison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="previous-period">Previous Period</SelectItem>
                    <SelectItem value="year-over-year">Year over Year</SelectItem>
                    <SelectItem value="target">Against Target</SelectItem>
                    <SelectItem value="none">No Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline">
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            View Analytics
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 