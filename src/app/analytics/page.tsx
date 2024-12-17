"use client"; 

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { AnalyticsStats } from "@/components/analytics/AnalyticsStats";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { AnalyticsMetrics } from "@/components/analytics/AnalyticsMetrics";

export default function AnalyticsPage() {
  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <AnalyticsStats />
        <AnalyticsCharts />
        <AnalyticsMetrics />
      </div>
    </main>
  );
} 