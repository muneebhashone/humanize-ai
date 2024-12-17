import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const hourlyData = [
  { hour: "9 AM", calls: 45, success: 35 },
  { hour: "10 AM", calls: 78, success: 62 },
  { hour: "11 AM", calls: 92, success: 75 },
  { hour: "12 PM", calls: 65, success: 48 },
  { hour: "1 PM", calls: 89, success: 70 },
  { hour: "2 PM", calls: 106, success: 88 },
  { hour: "3 PM", calls: 85, success: 65 },
  { hour: "4 PM", calls: 72, success: 58 },
  { hour: "5 PM", calls: 54, success: 42 },
];

const performanceData = [
  { day: "Mon", performance: 85 },
  { day: "Tue", performance: 92 },
  { day: "Wed", performance: 88 },
  { day: "Thu", performance: 95 },
  { day: "Fri", performance: 89 },
  { day: "Sat", performance: 78 },
  { day: "Sun", performance: 82 },
];

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4 border-0 bg-background">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Call Volume Overview</h3>
              <p className="text-sm text-muted-foreground">
                Hourly distribution of calls and success rate
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Last 24 Hours
            </Button>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <XAxis 
                  dataKey="hour"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar
                  dataKey="calls"
                  fill="hsl(221, 83%, 53%)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="success"
                  fill="hsl(142, 76%, 36%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="col-span-3 border-0 bg-background">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Performance Trend</h3>
              <p className="text-sm text-muted-foreground">
                Weekly performance metrics
              </p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="performance"
                  stroke="hsl(142, 76%, 36%)"
                  dot={{ fill: "hsl(142, 76%, 36%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
} 