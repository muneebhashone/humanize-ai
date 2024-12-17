import { Card } from "@/components/ui/card";
import { Phone, Users, CheckCircle2, Clock, TrendingUp } from "lucide-react";

export function AnalyticsMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-0 bg-background">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Call Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Inbound</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">2,350</span>
                <span className="text-sm text-green-600">+12.3%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Outbound</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">1,203</span>
                <span className="text-sm text-green-600">+8.1%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-0 bg-background">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Agent Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-violet-500" />
                <span className="text-sm font-medium">Active Agents</span>
              </div>
              <span className="text-2xl font-bold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">78%</span>
                <span className="text-sm text-green-600">+5.2%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-0 bg-background">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Call Duration</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Average</span>
              </div>
              <span className="text-2xl font-bold">4:35</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Peak Hours</span>
              </div>
              <span className="text-2xl font-bold">2-4 PM</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 