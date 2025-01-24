"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Card } from "../ui/card";
import { PhoneCall, PhoneOff } from "lucide-react";
import { useCallLogsQuery } from "@/hooks/queries/use-call-queries";
import { Skeleton } from "../ui/skeleton";

const CallLogs = () => {
  const { data: callLogs, isLoading } = useCallLogsQuery();

  // Helper function to format duration
  const getDuration = (start: string, end?: string) => {
    if (!end) return "In Progress";
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  // Helper function to format time
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  // Helper function to format date
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <main className="flex w-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Call Logs</h2>
        </div>

        <Card className="border-0 bg-background">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Type
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Agent ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Customer
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Phone
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Duration
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Time
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <tr
                        key={index}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <td colSpan={8} className="p-4">
                          <Skeleton className="h-8 w-full" />
                        </td>
                      </tr>
                    ))
                ) : !callLogs?.data?.length ? (
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <td
                      colSpan={8}
                      className="p-4 text-center text-muted-foreground"
                    >
                      No call logs found
                    </td>
                  </tr>
                ) : (
                  callLogs.data.map((call) => (
                    <tr
                      key={call._id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full",
                            call.type === "outbound"
                              ? "bg-green-100 dark:bg-green-500/20"
                              : "bg-blue-100 dark:bg-blue-500/20"
                          )}
                        >
                          {call.type === "outbound" ? (
                            <PhoneCall className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <PhoneOff className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-medium">{call.agent_id}</td>
                      <td className="p-4">{call.customer_name}</td>
                      <td className="p-4 font-mono text-sm">
                        {call.customer_phone_no}
                      </td>
                      <td className="p-4">
                        {getDuration(call.timestamp_start, call.timestamp_end)}
                      </td>
                      <td className="p-4">
                        {formatTime(call.timestamp_start)}
                      </td>
                      <td className="p-4">
                        {formatDate(call.timestamp_start)}
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            call.status === "complete"
                              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                              : call.status === "in_progress"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                          )}
                        >
                          {call.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default CallLogs;
